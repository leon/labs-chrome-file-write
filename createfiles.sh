#!/bin/bash

TIMEFORMAT="%3lR"

time for i in 0 1 2 3 4 5 6 7 8 9; do mkfile -n 10m out/${i}.bin; done
