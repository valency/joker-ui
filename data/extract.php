<?php
system("gunzip " . $_GET["f"], $retval);
echo $retval;