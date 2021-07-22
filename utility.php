<?php
function debug_to_console($data)
{
        // return; //uncomment this to diable all debug texts
        $output = $data;
        if (is_array($output)) $output = implode(',', $output);
        echo "<script>console.log('PHP:  $output ' );</script>";
}

function displayTableRows($collection, $showId = true)
{
        for ($i = 0; $i < count($collection); $i++) {
                $idCell = ($showId) ? '<td> ' . ($i + 1) . '</td>' : '';
                $contentCells = '';
                for ($j = 0; $j < count($collection[$i]); $j++) {
                        $contentCells .= '<td>' . $collection[$i][$j] . '</td>';
                }
                echo '
                <tr>
                        ' . $idCell . $contentCells . '
                </tr>       
                ';
        }
}
