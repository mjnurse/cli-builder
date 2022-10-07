#!/bin/bash

debug_yn=n
if [[ "$1" == "-d" ]]; then
   debug_yn=y
   shift
fi

l80="--------------------------------------------------------------------------------"

c_bla="\\\e[30m"
c_blu="\\\e[34m"
c_cya="\\\e[36m"
c_def="\\\e[39m"
c_gra="\\\e[90m"
c_gre="\\\e[32m"
c_mag="\\\e[35m"
c_red="\\\e[31m"
c_whi="\\\e[97m"
c_yel="\\\e[33m"

c_lblu="\\\e[94m"
c_lcya="\\\e[96m"
c_lgra="\\\e[37m"
c_lgre="\\\e[92m"
c_lmag="\\\e[95m"
c_lred="\\\e[91m"
c_lyel="\\\e[93m"


function check_params() {
   # param 1 - actual number of parameters
   # param 2 - required number of parameters
   # param 3 - incorrect parameters message

   if [[ "$1" < "$2" ]]; then
      echo "$3"
      exit
   fi
}

function print_command() {
   # param 1 - command

   if [[ $debug_yn == y ]]; then
      echo "COMMAND: $*" | sed s/./-/g
      echo "COMMAND: $*"
      echo "COMMAND: $*" | sed s/./-/g
   fi
}

section="HISTORY"
if [[ "$1" == "history" || "$1" == "h" ]]; then
   if [[ "$1" == "h" ]]; then shift; else shift 1; fi
   usage="history (h)"
   check_params $# 0 "Usage: $usage"
   print_command git log > /tmp/gi1;   while read line; do echo $line;     if [[ ${line:0:6} == commit ]]; then       git diff-tree --no-commit-id --name-only -r ${line:7:99} |         tr "\n" " " | fold -s -w 100; echo;     fi;   done < /tmp/gi1 |   sed "s/^  *//; /^$/d; s/^commit/${l80}\n${c_yel}Commit:/" |   sed "s/^Author/${c_lcya}Author/; s/^Date/${c_lgre}Date/; s/$/${c_whi}/" > /tmp/gi2;   echo -e "$(cat /tmp/gi2)";   rm -f /tmp/gi1 /tmp/gi2
   git log > /tmp/gi1;   while read line; do echo $line;     if [[ ${line:0:6} == commit ]]; then       git diff-tree --no-commit-id --name-only -r ${line:7:99} |         tr "\n" " " | fold -s -w 100; echo;     fi;   done < /tmp/gi1 |   sed "s/^  *//; /^$/d; s/^commit/${l80}\n${c_yel}Commit:/" |   sed "s/^Author/${c_lcya}Author/; s/^Date/${c_lgre}Date/; s/$/${c_whi}/" > /tmp/gi2;   echo -e "$(cat /tmp/gi2)";   rm -f /tmp/gi1 /tmp/gi2
   exit
fi
section="STATUS"
if [[ "$1" == "status" || "$1" == "s" ]]; then
   if [[ "$1" == "s" ]]; then shift; else shift 1; fi
   usage="status (s)"
   check_params $# 0 "Usage: $usage"
   print_command git status
   git status
   exit
fi
section="ADD/COMMIT"
if [[ "$1 $2" == "push -f|--force" || "$1" == "p" ]]; then
   if [[ "$1" == "p" ]]; then shift; else shift 2; fi
   usage="push (p) [-f|--force] [<message>]"
   check_params $# 0 "Usage: $usage"
   print_command force_yn=n;   if [[ $1 == -f || $1 == --force ]]; then     force_yn=y;     shift;   fi;   echo $1
   force_yn=n;   if [[ $1 == -f || $1 == --force ]]; then     force_yn=y;     shift;   fi;   echo $1
   exit
fi
section="HELP"
if [[ "$1" == "help" || "$1" == "he" ]]; then
   if [[ "$1" == "he" ]]; then shift; else shift 1; fi
   usage="help (he)"
   check_params $# 0 "Usage: $usage"
   egrep "usage=|section=" $0 | grep -v "grep" | sed "s/.*usage=/   /; s/.*section=//; s/\"//g"
   exit
fi

if [[ "$1" == "" ]]; then
   echo "No option passed"
else
   echo "$*: invalid option"
fi
echo "Try \"gi help\" for more information."

