import dotenv from "dotenv";
dotenv.config();
import chalk from "chalk";

export default {
  title(message: object) {
    if (process.env.DEV == "false") return;
    console.log(chalk.bold(message))
  },
  success(message: any) {
    if (process.env.DEV == "false") return;
    if (typeof message == "object" && message.statusText) {
      var msg = message.statusText?.split(" : ");
      var status = chalk.green("success "+msg[0]);
      console.log(status+" "+msg[1]);
    } else {
      var status = chalk.green("success ");
      console.log(status+message);
    }
  },
  warning(message: any) {
    if (process.env.DEV == "false") return;
    if (typeof message == "object" && message.statusText) {
      var msg = message.statusText?.split(" : ");
      var status = chalk.yellow("warning "+msg[0]);
      console.log(status+" "+msg[1]);
    } else {
      var status = chalk.yellow("warning ");
      console.log(status+message);
    }
  },
  info(message: any) {
    if (process.env.DEV == "false") return;
    if (typeof message == "object" && message.statusText) {
      var msg = message.statusText?.split(" : ");
      var status = chalk.blue("info "+msg[0]);
      console.log(status+" "+msg[1]);
    } else {
      var status = chalk.blue("info ");
      console.log(status+message);
    }
  },
  error(message: any) {
    if (process.env.DEV == "false") return;
    if (typeof message == "object" && message.statusText) {
      var msg = message.statusText?.split(" : ");
      var status = chalk.red("error "+msg[0]);
      console.log(status+" "+msg[1]);
    } else {
      var status = chalk.red("error ");
      console.log(status+message);
    }
  },
  complete(message: any) {
    if (process.env.DEV == "false") return;
    if (typeof message == "object" && message.statusText) {
      var msg = message.statusText?.split(" : ");
      var status = chalk.magenta("complete "+msg[0]);
      console.log(status+" "+msg[1]);
    } else {
      var status = chalk.magenta("complete ");
      console.log(status+message);
    }
  },
  group(messages: any) {
    if (process.env.DEV == "false") return;
    var branch = "├─"
    var end = "└─"
    for (let i = 0; i < messages.length; i++) {
      if (i+1 === messages.length) return console.log(end + " " + messages[i]);
      console.log(branch + " " + messages[i]);
    }
  },
  branch(message: any) {
    if (process.env.DEV == "false") return;
    console.log("├─ "+message);
  },
  openBranch(message: any) {
    if (process.env.DEV == "false") return;
    console.log("├  "+message);
  },
  endBranch(message: any) {
    if (process.env.DEV == "false") return;
    console.log("└─ "+message);
  }
}
