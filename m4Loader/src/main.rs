use std::io::{Read, Write};
use std::fs::{read_to_string, File};
use std::path::PathBuf;
use std::str::FromStr;
use std::collections::{BTreeMap, BTreeSet};
use proc_macro2::*;
use rustfmt_wrapper::rustfmt;

const PATH: &str = "../aqueduct/src";
const ERRORS: &str = "
    #[error(\"original operation somehow got lost during messages\")]
    M4MismatchedOperationError,
    #[error(\"original operation context somehow got lost during messages\")]
    M4MismatchedOperationContextError,
    #[error(\"original message somehow got lost during messages\")]
    M4MismatchedMessageError,
    #[error(\"original message context somehow got lost during messages\")]
    M4MismatchedMessageContextError,
";
const M4: &str = "
#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct M4 {
    pub original_chain: ChainId,
    pub original_operation: Option<Operation>,
    pub original_ope_context: Option<OperationContext>,
    pub original_message: Option<ActualMessage>,
    pub original_msg_context: Option<MessageContext>,
}
";

fn main() {
    print!("WARNING: m4 currently does not support:
        message in loop, while, and for;
        let x = if ... where the if ... contains a message;
        let x = match ... where the match ... contains a message;
        ? operator after the first message;
        pattern desctructuring anywhere; use #[addvar(...: ...)] to add back vars you will use;
        let without specifying the type;
    the program may or may not work in the above cases. there will be no warning.\n\n");
    let mut m4_file = "".to_string();
    let mut m4_path = PathBuf::from(PATH);
    let mut final_operations = vec![];
    let mut final_messages = vec![TokenStream::from_str("Message::Result { m4, origin, result } => {
        info!(\"m4: {:?}\norigin: {}res: {}\", m4, origin, result);
        Ok(ExecutionResult::default())
    },").unwrap_or_else(|le| { print!("{:?}", le); TokenStream::from_str("").unwrap() }).into_iter().collect::<Vec<_>>(),
    TokenStream::from_str("Message::Default => { Ok(ExecutionResult::default() },").unwrap_or_else(|le| { print!("{:?}", le); TokenStream::from_str("").unwrap() }).into_iter().collect::<Vec<_>>()];
    let mut final_Messages = vec![];
    let mut match_things = vec![];
    m4_path.push("m4.rs");
    let _ = File::open(m4_path.as_path()).unwrap().read_to_string(&mut m4_file);
    let m4: Vec<_> = TokenStream::from_str(&m4_file).unwrap().into_iter().collect();
    for i in 0..(m4.len() - 2) {
        if format!("{}", m4[i]) == "match".to_string() {
            let mode = format!("{}", m4[i + 1]);
            print!("[{}]", mode);
            //if mode != "operation".to_string() || mode != "message".to_string() {
            //    panic!("match followed by something other than operation or message");
            //}
            if let TokenTree::Group(g) = &m4[i + 2] {
                for e in (&g.stream().into_iter().collect::<Vec<_>>()).split(|tt| {
                    if let TokenTree::Punct(p) = tt { return p.as_char() == ','; }
                    return false;
                }) {
                    if e.len() == 0 { continue; }
                    if let Some(TokenTree::Group(g)) = e.iter().rev().next() {
                        let mut match_thing = e.to_vec();
                        match_thing.pop();
                        match_thing.pop();
                        match_thing.pop();
                        if mode == "message" { match_things.push(match_thing.clone()); }
                        let mut pv: Vec<String> = vec![];
                        let mmmm = MMMMessage {
                            var_name: "_".to_string(),
                            prev_vars: pv.clone(),
                            code: beninging(&mode, &match_thing),
                            chain: vec![],
                            func: vec![],
                        };
                        let mut mmmmap = BTreeMap::new();
                        mmmmap.insert("".to_string(), mmmm);
                        let mut mmm = MMM {
                            mode: mode.clone(),
                            match_thing,
                            messages: mmmmap,
                        };
                        let mut set = BTreeSet::<String>::new();
                        set.insert("".to_string());
                        recurse(g.stream().into_iter().collect(), &mut mmm, &mut set, &mut pv, &mut final_Messages);
                        print!("\n\nmode: {}\nmatch_thing: {}\nmessages: \n", mmm.mode, TokenStream::from_iter(mmm.match_thing.clone().into_iter()));
                        for (a, b) in &mmm.messages {
                            print!("    [{}]:\n        var_name: {}\n        prev_vars: {:?}\n", a, b.var_name, b.prev_vars);
                            print!("        chain: {}\n", TokenStream::from_iter(b.chain.clone().into_iter()));
                            print!("        func: {}\n", TokenStream::from_iter(b.func.clone().into_iter()));
                            print!("        code: {}\n", TokenStream::from_iter(b.code.clone().into_iter()));
                        }
                        for (name, mmmm) in &mmm.messages {
                            write(&mmm, name.clone(), &mut final_operations, &mut final_messages);
                        }
                    } else {
                        panic!("please use braces after =>");
                    }
                }
            }
        }
    }
    let mut contract_file = "".to_string();
    let mut contract_path = PathBuf::from(PATH);
    contract_path.push("contract.rs");
    let _ = File::open(contract_path.as_path()).unwrap().read_to_string(&mut contract_file);
    let mut fo = "fn main() { match operation {".to_string();
    for o in final_operations {
        fo += &format!("{}\n", TokenStream::from_iter(o.clone().into_iter()));
    }
    fo += "};}";
    let mut contract_lines = contract_file.split("\n").map(|s| s.to_string()).collect::<Vec<_>>();
    frick(&mut contract_lines, "//m4 execute_operation".to_string(), rustfmt(fo).unwrap(), 2, 3);
    let mut fm = "fn main() { match message {".to_string();
    for m in final_messages {
        fm += &format!("{}\n", TokenStream::from_iter(m.clone().into_iter()));
    }
    fm += "};}";
    frick(&mut contract_lines, "//m4 execute_message".to_string(), rustfmt(fm).unwrap(), 2, 3);
    frick(&mut contract_lines, "//m4 errors".to_string(), ERRORS.to_string(), 0, 0);
    let mut f = std::fs::OpenOptions::new().write(true).truncate(true).open(contract_path).unwrap();
    let _ = f.write_all(contract_lines.join("\n").as_bytes());
    let _ = f.flush();
    let mut lib_file = "".to_string();
    let mut lib_path = PathBuf::from(PATH);
    lib_path.push("lib.rs");
    let _ = File::open(lib_path.as_path()).unwrap().read_to_string(&mut lib_file);
    let mut lib_lines = lib_file.split("\n").map(|s| s.to_string()).collect::<Vec<_>>();
    let mut fM = "enum Message { Result { m4: M4, origin: ChainId, result: String },".to_string();
    for m in final_Messages {
        fM += &m;
    }
    fM += "}";
    frick(&mut lib_lines, "//m4 Message".to_string(), rustfmt(fM).unwrap(), 1, 2);
    frick(&mut lib_lines, "//m4 M4".to_string(), M4.to_string(), 0, 0);
    /*let mut fam = "pub enum ActualMessage {".to_string();
    for mut m in match_things {
        m.remove(0);
        m.remove(0);
        m.remove(0);
        fam += &format!("{}", TokenStream::from_iter(m.clone().into_iter()));
        fam += ",";
    }
    fam += "}";
    frick(&mut lib_lines, "//m4 ActualMessage".to_string(), rustfmt(fam).unwrap(), 0, 0);*/
    f = std::fs::OpenOptions::new().write(true).truncate(true).open(lib_path).unwrap();
    let _ = f.write_all(lib_lines.join("\n").as_bytes());
    let _ = f.flush();
}

fn frick(lines: &mut Vec<String>, id: String, cont: String, top: u8, bottom: u8) {
    let start = lines.split(|l| l.ends_with(&(id.clone() + " start"))).nth(0).unwrap();
    let cont2: String = cont.splitn((top + 1).into(), "\n").nth(top.into()).unwrap().to_string();
    let cont3: String = cont2.rsplitn((bottom + 1).into(), "\n").nth(bottom.into()).unwrap().to_string();
    let end = lines.split(|l| l.ends_with(&(id.clone() + " end"))).nth(1).unwrap_or(&[]);
    let a1 = [id.clone() + " start", cont3, id.clone() + " end"];
    let a2 = [start, &a1, end];
    *lines = a2.concat();
}

fn write(mmm: &MMM, name: String, final_operations: &mut Vec<Vec<TokenTree>>, final_messages: &mut Vec<Vec<TokenTree>>) -> () {
    let mut res = vec![];
    let mut end = TokenStream::from_str("").unwrap();
    if format!("{}", TokenStream::from_iter(mmm.messages[&name].code.clone())).ends_with("}") {
        end = TokenStream::from_str("Ok(ExecutionResult::default())").unwrap();
    }
    if name.is_empty() {
        res.append(&mut mmm.match_thing.clone());
        res.append(&mut TokenStream::from_str("=>").unwrap().into_iter().collect());
        res.push(TokenTree::Group(Group::new(Delimiter::Brace, TokenStream::from_iter(mmm.messages[&name].code.clone().into_iter().chain(end.clone().into_iter())))));
        res.push(TokenTree::Punct(Punct::new(',', Spacing::Alone)));
        if &mmm.mode == "operation" {
            final_operations.push(res);
        } else {
            final_messages.push(res);
        }
    } else {
        let mut res1: Vec<_> = TokenStream::from_str(&("Ok(".to_string() + &mmm.messages[&name].var_name.splitn(2, ':').next().unwrap() + ") => ")).unwrap().into_iter().collect();
        res1.push(TokenTree::Group(Group::new(Delimiter::Brace, TokenStream::from_iter(mmm.messages[&name].code.clone().into_iter().chain(end.clone().into_iter())))));
        res1.append(&mut TokenStream::from_str(", Err(error) => ").unwrap().into_iter().collect());
        res1.push(TokenTree::Group(Group::new(Delimiter::Brace, TokenStream::from_str("let __message = Message::Result {
                m4: m4.clone(),
                origin: system_api::current_chain_id(),
                result: format!{\"{:?}\", error},
            };
            return Ok(ExecutionResult::default().with_authenticated_message(m4.original_chain, __message));").unwrap())));
        let mut res2 = vec![TokenTree::Ident(Ident::new("match", Span::call_site()))];
        res2.append(&mut mmm.messages[&name].func.clone());
        res2.push(TokenTree::Group(Group::new(Delimiter::Brace, TokenStream::from_iter(res1.into_iter()))));
        let mut mode2 = "";
        let mut mode3 = "";
        if &mmm.mode == "operation" {
            mode2 = "ope";
            mode3 = "Operation";
        } else {
            mode2 = "msg";
            mode3 = "Message";
        }
        let mut res3: Vec<_> = TokenStream::from_str(&("if let Some(".to_string() + mode2 + "_context) = m4.original_" + mode2 + "_context.clone()")).unwrap().into_iter().collect();
        res3.push(TokenTree::Group(Group::new(Delimiter::Brace, TokenStream::from_iter(res2.into_iter()))));
        res3.append(&mut TokenStream::from_str(&("else {
            let __message = Message::Result {
                m4: m4.clone(),
                origin: system_api::current_chain_id(),
                result: \"M4Mismatched".to_string() + mode3 + "ContextError\".to_string(),
            };
            Ok(ExecutionResult::default().with_authenticated_message(m4.original_chain, __message))
        }")).unwrap().into_iter().collect());
        let mut actual = "if let Some(";
        if &mmm.mode == "message" { actual = "if let Some(Actual"; }
        let mut res4: Vec<_> = TokenStream::from_str(&(actual.to_string() + &format!("{}", TokenStream::from_iter(mmm.match_thing.clone().into_iter())) + ") = m4.original_" + &mmm.mode + ".clone()")).unwrap().into_iter().collect();
        res4.push(TokenTree::Group(Group::new(Delimiter::Brace, TokenStream::from_iter(res3.into_iter()))));
        res4.append(&mut TokenStream::from_str(&("else {
            let __message = Message::Result {
                m4: m4.clone(),
                origin: system_api::current_chain_id(),
                result: \"M4Mismatched".to_string() + mode3 + "Error\".to_string(),
            };
            Ok(ExecutionResult::default().with_authenticated_message(m4.original_chain, __message))
        }")).unwrap().into_iter().collect());
        let mut s = "Message::".to_string() + &format!("{}", mmm.match_thing[3]) + "_" + name.as_str() + "{
            m4,
        ";
        for var in &mmm.messages[&name].prev_vars {
            s += var.splitn(2, ':').next().unwrap();
            s += ",\n";
        }
        s += "} => ";
        let mut res5: Vec<_> = TokenStream::from_str(&s).unwrap().into_iter().collect();
        res5.push(TokenTree::Group(Group::new(Delimiter::Brace, TokenStream::from_iter(res4.into_iter()))));
        res5.push(TokenTree::Punct(Punct::new(',', Spacing::Alone)));
        final_messages.push(res5);
    }
}

fn beninging(mode: &String, match_thing: &Vec<TokenTree>) -> Vec<TokenTree> {
    let tt = if *mode == "operation".to_string() {
        "let m4 = M4 {
            original_chain: system_api::current_chain_id(),
            original_operation: Some(operation),
            original_ope_context: Some(context.clone()),
            original_message: None,
            original_msg_context: None,
        };".to_string()
    } else {
        "let m4 = M4 {
            original_chain: system_api::current_chain_id(),
            original_operation: None,
            original_ope_context: None,
            original_message: Some(Actual".to_string() + &format!("{}", TokenStream::from_iter(match_thing.clone().into_iter())) + "),
            original_msg_context: Some(context.clone()),
        };"
    };
    TokenStream::from_str(&tt).unwrap().into_iter().collect()
}

fn actual_message(name: &String, mode: &String, match_thing: &Vec<TokenTree>, chain: &Vec<TokenTree>, prev_vars: &Vec<String>, next_name: &String) -> Vec<TokenTree> {
    let mut s = "let __message = Message::".to_string() + &format!("{}", match_thing[3]) + "_" + next_name.as_str();
    s += "{\nm4: m4.clone(),\n";
    for var in prev_vars {
        s += var.splitn(2, ':').next().unwrap();
        s += ":";
        s += var.splitn(2, ':').next().unwrap();
        s += ".clone(),\n";
    }
    s += &("};\nreturn Ok(ExecutionResult::default().with_authenticated_message(".to_string() + &format!("{}", TokenStream::from_iter(chain.clone().into_iter())) + ", __message))");
    return TokenStream::from_str(&s).unwrap().into_iter().collect();
}

fn make_Message(name: &String, match_thing: &Vec<TokenTree>, prev_vars: &Vec<String>) -> String {
    let mut s = format!("{}", match_thing[3]) + "_" + name + " {
        m4: M4,";
    for var in prev_vars {
        s += "\n";
        s += var;
        s += ",";
    }
    s += "\n},";
    s
}

#[derive(Debug)]
struct MMM {
    mode: String,
    match_thing: Vec<TokenTree>,
    messages: BTreeMap<String, MMMMessage>,
}

#[derive(Debug, Clone)]
struct MMMMessage {
    var_name: String,
    prev_vars: Vec<String>,
    code: Vec<TokenTree>,
    chain: Vec<TokenTree>,
    func: Vec<TokenTree>,
}

fn recurse(v: Vec<TokenTree>, mmm: &mut MMM, cur: &mut BTreeSet<String>, prev_vars: &mut Vec<String>, final_Messages: &mut Vec<String>) -> () {
    //let braces = v.iter().enumerate().filter(|&&(ind, &x)| format!("{}", x)[0] == '{');
    //let (next_brace_ind, next_brace_tt) = braces.next();
    let mut braces = true;
    let mut braces_set = BTreeSet::new();
    //let mut line_start = false;
    let mut i = 0;
    while i < v.len() {
        let asstr = format!("{}", v[i]);
        if asstr == "let".to_string() && (i == 0 || format!("{}", v[i - 1]) != "if") {
            let mut start = i + 1;
            if format!("{}", v[i + 1]).as_str() == "mut" { start = i + 2; }
            let mut bruh = "".to_string();
            while format!("{}", v[start]).as_str() != "=" {
                bruh += format!("{}", v[start]).as_str();
                start += 1;
            }
            prev_vars.push(bruh);
        }
        if asstr == "return".to_string() {
            let s = "let __message = Message::Result {
                m4: m4.clone(),
                origin: system_api::current_chain_id(),
                result: ".to_string() + &format!("\"{}{}\"", v[i + 1], v[i + 2]) + ".to_string(),
            };
            return Ok(ExecutionResult::default().with_authenticated_message(m4.original_chain, __message));";
            for curcur in cur.iter() {
                let mut temp = mmm.messages[curcur].clone();
                temp.code.append(&mut TokenStream::from_str(&s).unwrap().into_iter().collect());
                mmm.messages.insert(curcur.to_string(), temp);
            }
            i += 3;
        } else if asstr == "#".to_string() {
            if i < v.len() - 2 {
                let ugh = format!("{}", v[i + 1]);
                print!("\nugh: {}\n", ugh);
                if ugh.starts_with("[addvar") {
                    let var_name = (&ugh[9..ugh.len() - 2]).to_string();
                    prev_vars.push(var_name);
                    i += 1;
                } else if ugh.starts_with("[message") {
                    let message_name = (&ugh[10..ugh.len() - 2]).to_string();
                    let mut var_name = "_".to_string();
                    let mut temp = "".to_string();
                    if i > 1 && format!("{}", v[i - 1]) == "=".to_string() { 
                        temp = prev_vars.pop().unwrap();
                        var_name = "".to_string();
                        let mut j = i - 2;
                        while format!("{}", v[j]) != "let".to_string() && format!("{}", v[j]) != "mut".to_string() {
                            var_name = format!("{}", v[j]).to_string() + &var_name;
                            for curcur in cur.iter() {
                                let mut temp = mmm.messages[curcur].clone();
                                temp.code.pop();
                                mmm.messages.insert(curcur.to_string(), temp);
                            }
                            j -= 1;
                        }
                        for curcur in cur.iter() {
                            let mut temp = mmm.messages[curcur].clone();
                            temp.code.pop();
                            mmm.messages.insert(curcur.to_string(), temp);
                        }
                        if format!("{}", v[j]) != "mut".to_string() {
                            for curcur in cur.iter() {
                                let mut temp = mmm.messages[curcur].clone();
                                temp.code.pop();
                                mmm.messages.insert(curcur.to_string(), temp);
                            }
                        }
                    }
                    if let TokenTree::Group(g) = &v[i + 2] {
                        let what = &g.stream().into_iter().collect::<Vec<_>>();
                        let mut it = what.split(|tt| format!("{}", tt) == ",");
                        let chain = it.next().expect("no chain in message macro").to_vec();
                        let func = it.next().expect("no function in message macro").to_vec();
                        mmm.messages.insert(message_name.clone(), MMMMessage {
                            var_name,
                            prev_vars: prev_vars.to_vec(),
                            code: vec![],
                            chain: chain.clone(),
                            func,
                        });
                        for curcur in cur.iter() {
                            let mut temp = mmm.messages[curcur].clone();
                            temp.code.append(&mut actual_message(&curcur, &mmm.mode, &mmm.match_thing, &chain.clone(), prev_vars, &message_name));
                            mmm.messages.insert(curcur.to_string(), temp);
                        }
                        final_Messages.push(make_Message(&message_name, &mmm.match_thing, prev_vars));
                        *cur = BTreeSet::new();
                        cur.insert(message_name);
                        i += 3;
                    }
                    if !temp.is_empty() {
                        prev_vars.push(temp);
                    }
                }
            }
        } else if asstr.chars().nth(0) == Some('{') {
            for curcur in cur.iter() {
                let mut temp = mmm.messages[curcur].clone();
                temp.code.push(TokenTree::Punct(Punct::new('{', Spacing::Alone)));
                mmm.messages.insert(curcur.to_string(), temp);
            }
            if !braces { braces_set = BTreeSet::new(); }
            braces = i < v.len() - 1 && (format!("{}", v[i + 1]) == "else" || format!("{}", v[i + 1]) == ",");
            if let TokenTree::Group(g) = &v[i] {
                let mut cur2 = cur.clone();
                recurse(g.stream().into_iter().collect(), mmm, &mut cur2, &mut prev_vars.clone(), final_Messages);
                braces_set = braces_set.union(&cur2).cloned().collect();
            }
            for curcur in cur.iter() {
                let mut temp = mmm.messages[curcur].clone();
                temp.code.push(TokenTree::Punct(Punct::new('}', Spacing::Alone)));
                mmm.messages.insert(curcur.to_string(), temp);
            }
            if !braces { *cur = braces_set.clone(); }
        } else {
            for curcur in cur.iter() {
                let mut temp = mmm.messages[curcur].clone();
                temp.code.push(v[i].clone());
                mmm.messages.insert(curcur.to_string(), temp);
            }
        }
        i += 1;
        //line_start = (format!("{}", v[i]) == ";");
    }
}
