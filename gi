#!/usr/bin/env bash
debug_yn=n
[[ "$1" == "-d" ]] && { debug_yn=y; shift; }
[[ "${CLI_DEBUG^^}" == "TRUE" ]] && debug_yn=y

C_CYA="\x1b[96m" C_GRE="\x1b[92m" C_MAG="\x1b[95m" C_WHI="\x1b[97m" C_DEF="\x1b[0m"

# param 1 - actual number of parameters
# param 2 - required number of parameters
# param 3 - incorrect parameters message
check_params() {
  [[ "$1" < "$2" ]] && { echo -e "$3"; exit; }
}

print_command() {
  [[ $debug_yn == y ]] && { echo "COMMAND: $*" | sed 's/"/\"/g'; echo "COMMAND: $*" | sed 's/./-/g'; }
}
section="HELP"

if [[ "$1" == "help" || "$1" == "ghe" ]]; then
   [[ "$1" == "ghe" ]] && shift || shift 1
   usage="\x1b[95mhelp \x1b[96m(ghe)\x1b[97m\x1b[0m"
   check_params $# 0 "Usage: $usage"
   
echo -e "\x1b[92mgen:2026-05-26 12:29\x1b[0m"
echo

            while IFS= read -r line; do echo -e "${line}${CRESET}"; done < <(egrep "usage=|section=" "$0" | grep -v "grep" | sed "s/.*usage=/   /; s/.*section=/\x1b[92m/; s/\"//g")
   exit
fi
section="GENERAL"

if [[ "$1 $2 $3" == "add commit push" || "$1" == "gacp" ]]; then
   [[ "$1" == "gacp" ]] && shift || shift 3
   usage="\x1b[95madd commit push \x1b[96m(gacp)\x1b[97m [-f|--force] [message]\x1b[0m"
   check_params $# 0 "Usage: $usage"
   print_command " force_yn=n; if [[ $1 == -f || $1 == --force ]]; then force_yn=y; shift; fi; if [[ \"$1\" == \"\" ]]; then message=\"Various\"; else message=\"$1\"; fi; [ -f ./gen-readme ] && ./gen-readme; git add .; git status; if [[ \"$1\" != \"-f\" ]]; then read -p 'Press a key to continue, CTRL-C to abort' dummy; fi; git commit -m 'Various'; git push origin"
   force_yn=n; if [[ $1 == -f || $1 == --force ]]; then force_yn=y; shift; fi; if [[ "$1" == "" ]]; then message="Various"; else message="$1"; fi; [ -f ./gen-readme ] && ./gen-readme; git add .; git status; if [[ "$1" != "-f" ]]; then read -p 'Press a key to continue, CTRL-C to abort' dummy; fi; git commit -m 'Various'; git push origin
   exit
fi

if [[ "$1 $2 $3" == "list branches local" || "$1" == "glbl" ]]; then
   [[ "$1" == "glbl" ]] && shift || shift 3
   usage="\x1b[95mlist branches local \x1b[96m(glbl)\x1b[97m [-d]\x1b[92m # -d - order by commit data\x1b[0m"
   check_params $# 0 "Usage: $usage"
   print_command " if [[ $1 == -d ]]; then git branch --format='%(creatordate:short), %(refname:short)' | column -s, -t | sort; else git branch --format='%(creatordate:short), %(refname:short)' | column -s, -t; fi"
   if [[ $1 == -d ]]; then git branch --format='%(creatordate:short), %(refname:short)' | column -s, -t | sort; else git branch --format='%(creatordate:short), %(refname:short)' | column -s, -t; fi
   exit
fi

if [[ "$1 $2 $3" == "list branches remote" || "$1" == "glbr" ]]; then
   [[ "$1" == "glbr" ]] && shift || shift 3
   usage="\x1b[95mlist branches remote \x1b[96m(glbr)\x1b[97m [-d]\x1b[92m # -d - order by commit data\x1b[0m"
   check_params $# 0 "Usage: $usage"
   print_command " if [[ $1 == -d ]]; then git branch -r --format='%(creatordate:short), %(refname:short)' | column -s, -t | sort; else git branch -r --format='%(creatordate:short), %(refname:short)' | column -s, -t; fi"
   if [[ $1 == -d ]]; then git branch -r --format='%(creatordate:short), %(refname:short)' | column -s, -t | sort; else git branch -r --format='%(creatordate:short), %(refname:short)' | column -s, -t; fi
   exit
fi

if [[ "$1" == "clone" || "$1" == "gc" ]]; then
   [[ "$1" == "gc" ]] && shift || shift 1
   usage="\x1b[95mclone \x1b[96m(gc)\x1b[97m <url>\x1b[0m"
   check_params $# 1 "Usage: $usage"
   print_command " git clone $1"
   git clone $1
   exit
fi

if [[ "$1 $2" == "create archive" || "$1" == "gca" ]]; then
   [[ "$1" == "gca" ]] && shift || shift 2
   usage="\x1b[95mcreate archive \x1b[96m(gca)\x1b[97m <name>\x1b[92m # Create <name>.zip - contains the contents of the current checked out repo (no .git)\x1b[0m"
   check_params $# 1 "Usage: $usage"
   print_command " git archive --format-zip HEAD -o $1.zip"
   git archive --format-zip HEAD -o $1.zip
   exit
fi

if [[ "$1 $2" == "create bundle" || "$1" == "gcb" ]]; then
   [[ "$1" == "gcb" ]] && shift || shift 2
   usage="\x1b[95mcreate bundle \x1b[96m(gcb)\x1b[97m <name>\x1b[92m # Creates <name>.bundle - contains the repo with history\x1b[0m"
   check_params $# 1 "Usage: $usage"
   print_command " git bundle create $1.bundle --all"
   git bundle create $1.bundle --all
   exit
fi

if [[ "$1" == "fetch" || "$1" == "gf" ]]; then
   [[ "$1" == "gf" ]] && shift || shift 1
   usage="\x1b[95mfetch \x1b[96m(gf)\x1b[97m\x1b[0m"
   check_params $# 0 "Usage: $usage"
   print_command " git fetch"
   git fetch
   exit
fi

if [[ "$1" == "history" || "$1" == "gh" ]]; then
   [[ "$1" == "gh" ]] && shift || shift 1
   usage="\x1b[95mhistory \x1b[96m(gh)\x1b[97m\x1b[0m"
   check_params $# 0 "Usage: $usage"
   print_command " git log > /tmp/gi1; while read line; do echo $line; if [[ ${line:0:6} == commit ]]; then git diff-tree --no-commit-id --name-only -r ${line:7:99} | tr \"\n\" \" \" | fold -s -w 100; echo; fi; done < /tmp/gi1 | sed \"s/^  *//; /^$/d; s/^commit/${l80}\n${c_yel}Commit:/\" | sed \"s/^Author/${c_lcya}Author/; s/^Date/${c_lgre}Date/; s/$/${c_whi}/\"; rm -f /tmp/gi1 /tmp/gi2"
   git log > /tmp/gi1; while read line; do echo $line; if [[ ${line:0:6} == commit ]]; then git diff-tree --no-commit-id --name-only -r ${line:7:99} | tr "\n" " " | fold -s -w 100; echo; fi; done < /tmp/gi1 | sed "s/^  *//; /^$/d; s/^commit/${l80}\n${c_yel}Commit:/" | sed "s/^Author/${c_lcya}Author/; s/^Date/${c_lgre}Date/; s/$/${c_whi}/"; rm -f /tmp/gi1 /tmp/gi2
   exit
fi

if [[ "$1" == "pull" || "$1" == "gpu" ]]; then
   [[ "$1" == "gpu" ]] && shift || shift 1
   usage="\x1b[95mpull \x1b[96m(gpu)\x1b[97m\x1b[0m"
   check_params $# 0 "Usage: $usage"
   print_command " git pull"
   git pull
   exit
fi

if [[ "$1 $2" == "push origin" || "$1" == "gpo" ]]; then
   [[ "$1" == "gpo" ]] && shift || shift 2
   usage="\x1b[95mpush origin \x1b[96m(gpo)\x1b[97m\x1b[0m"
   check_params $# 0 "Usage: $usage"
   print_command " git push origin"
   git push origin
   exit
fi
gitsearch() { show_branch_yn=n; if [[ $1 == -b ]]; then show_branch_yn=y; fi; rm -f /tmp/gi-cli.tmp*; grep_args=""; [ -n "$1" ] && grep_args="$grep_args --grep=$1"; [ -n "$2" ] && grep_args="$grep_args --grep=$2"; [ -n "$3" ] && grep_args="$grep_args --grep=$3"; git log --all --oneline --all-match $grep_args > /tmp/gi-cli.tmp2; if [[ $show_branch_yn == n ]]; then cat /tmp/gi-cli.tmp2; else echo "$(wc -l < /tmp/gi-cli.tmp2) hits -  fetching branch details"; while read hash msg; do branches=$(git branch --all --contains "$hash" | head -1 | sed 's/^ *//'); echo  "$branches || $msg" >> /tmp/gi-cli.tmp; printf "."; done < /tmp/gi-cli.tmp2; echo; column -s "||" -t < /tmp/gi-cli.tmp; fi; rm -f  /tmp/gi-cli.tmp*; }

if [[ "$1 $2 $3" == "search commit messages" || "$1" == "gscm" ]]; then
   [[ "$1" == "gscm" ]] && shift || shift 3
   usage="\x1b[95msearch commit messages \x1b[96m(gscm)\x1b[97m [-b] <word> [word] [word]\x1b[92m # (-b show branch name)\x1b[0m"
   check_params $# 1 "Usage: $usage"
   print_command " gitsearch $1 $2 $3"
   gitsearch $1 $2 $3
   exit
fi

if [[ "$1" == "status" || "$1" == "gs" ]]; then
   [[ "$1" == "gs" ]] && shift || shift 1
   usage="\x1b[95mstatus \x1b[96m(gs)\x1b[97m\x1b[0m"
   check_params $# 0 "Usage: $usage"
   print_command " git status"
   git status
   exit
fi

if [[ "$1 $2" == "switch branch" || "$1" == "gsb" ]]; then
   [[ "$1" == "gsb" ]] && shift || shift 2
   usage="\x1b[95mswitch branch \x1b[96m(gsb)\x1b[97m <branch-name>\x1b[92m # (git checkout)\x1b[0m"
   check_params $# 1 "Usage: $usage"
   print_command " git checkout $1"
   git checkout $1
   exit
fi

if [[ "$1" == "" ]]; then
  echo "No option passed"
else
  echo "$*: invalid option"
fi
echo "Try "gi help" for more information."
