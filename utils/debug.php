<?php
function debug_to_console($data)
{
        // return; //uncomment this to diable all debug texts
        $output = $data;
        if (is_array($output)) $output = implode(',', $output);
        echo "<script>console.log('PHP:  $output ' );</script>";
}
