<?php
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
