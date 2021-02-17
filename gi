#!/bin/bash

debug_yn=n
if [[ "$1" == "-d" ]]; then
   debug_yn=y
   shift
fi


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
   usage="history (h) [<xxxxx>]"
   check_params $# 0 "Usage: $usage"
   print_command git log
   git log
   exit
fi
if [[ "$1" == "hhistory" || "$1" == "hh" ]]; then
   if [[ "$1" == "hh" ]]; then shift; else shift 1; fi
   usage="hhistory (hh) [<xxxxx>]"
   check_params $# 0 "Usage: $usage"
   print_command git log | sed '/^$/d; s/^  *//'
   git log | sed '/^$/d; s/^  *//'
   exit
fi
section="INDEX INTERROGATION "
section="HELP"
if [[ "$1" == "help" || "$1" == "gih" ]]; then
   if [[ "$1" == "gih" ]]; then shift; else shift 1; fi
   usage="help (gih)"
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

