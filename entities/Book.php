<?php
class Book
{
        public function __construct(
                public string $Title,
                public string $author,
                public string $publicationTime,
                public string $difficulty,
                public string $pageCount,
                public string $pageRead,
                public string $imageUrl,
                public string $topics,
        ) {
        }

        public function displayRow($showId, $id)
        {
                $idCell = ($showId) ? '<td> ' . $id . '</td>' : '';
                echo
                '<tr> '
                        . $idCell . '
        <td> ' . $this->title . '</td>' . '
        <td> ' . $this->author . '</td>' . '
        <td> ' . $this->publicationTime . '</td>' . '
        <td> ' . $this->difficulty . '</td>' . '
        <td> ' . $this->pageCount . '</td>' . '
        <td> ' . $this->topics . '</td>' . '
</tr>';
        }
}
