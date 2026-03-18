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

if [[ "$1" == "help" || "$1" == "rhe" ]]; then
   [[ "$1" == "rhe" ]] && shift || shift 1
   usage="\x1b[95mhelp \x1b[96m(rhe)\x1b[97m\x1b[0m"
   check_params $# 0 "Usage: $usage"
   
echo -e "\x1b[92mgen:2026-03-18 15:00\x1b[0m"
echo

            while IFS= read -r line; do echo -e "${line}${CRESET}"; done < <(egrep "usage=|section=" "$0" | grep -v "grep" | sed "s/.*usage=/   /; s/.*section=/\x1b[92m/; s/\"//g")
   exit
fi
section="MDM"

if [[ "$1 $2" == "start mdm" || "$1" == "rsm" ]]; then
   [[ "$1" == "rsm" ]] && shift || shift 2
   usage="\x1b[95mstart mdm \x1b[96m(rsm)\x1b[97m [streaming|ui|all|k(afka)>|kapp]\x1b[92m # kapp starts kafka streaming for the application data source\x1b[0m"
   check_params $# 0 "Usage: $usage"
   print_command " mjn-start-mdm $1"
   mjn-start-mdm $1
   exit
fi

if [[ "$1 $2" == "restart mdm" || "$1" == "rsm" ]]; then
   [[ "$1" == "rsm" ]] && shift || shift 2
   usage="\x1b[95mrestart mdm \x1b[96m(rsm)\x1b[97m [streaming|ui|all|k(afka)>|kapp]\x1b[92m # kapp starts kafka streaming for the application data source\x1b[0m"
   check_params $# 0 "Usage: $usage"
   print_command " mjn-stop-mdm; mjn-start-mdm $1"
   mjn-stop-mdm; mjn-start-mdm $1
   exit
fi

if [[ "$1 $2" == "halt mdm" || "$1" == "rhm" ]]; then
   [[ "$1" == "rhm" ]] && shift || shift 2
   usage="\x1b[95mhalt mdm \x1b[96m(rhm)\x1b[97m\x1b[0m"
   check_params $# 0 "Usage: $usage"
   print_command " mjn-stop-mdm"
   mjn-stop-mdm
   exit
fi
section="ES / Postgres"

if [[ "$1 $2" == "start es" || "$1" == "rse" ]]; then
   [[ "$1" == "rse" ]] && shift || shift 2
   usage="\x1b[95mstart es \x1b[96m(rse)\x1b[97m\x1b[0m"
   check_params $# 0 "Usage: $usage"
   print_command " mjn-start-es-pg es"
   mjn-start-es-pg es
   exit
fi

if [[ "$1 $2" == "start postgres" || "$1" == "rsp" ]]; then
   [[ "$1" == "rsp" ]] && shift || shift 2
   usage="\x1b[95mstart postgres \x1b[96m(rsp)\x1b[97m\x1b[0m"
   check_params $# 0 "Usage: $usage"
   print_command " mjn-start-es-pg pg"
   mjn-start-es-pg pg
   exit
fi
section="CLI-BUILDER"

if [[ "$1 $2 $3" == "cli build all" || "$1" == "rcba" ]]; then
   [[ "$1" == "rcba" ]] && shift || shift 3
   usage="\x1b[95mcli build all \x1b[96m(rcba)\x1b[97m\x1b[0m"
   check_params $# 0 "Usage: $usage"
   print_command " cd ~/mjnurse/cli-builder; cli-builder *.def"
   cd ~/mjnurse/cli-builder; cli-builder *.def
   exit
fi

if [[ "$1" == "" ]]; then
  echo "No option passed"
else
  echo "$*: invalid option"
fi
echo "Try "r help" for more information."
