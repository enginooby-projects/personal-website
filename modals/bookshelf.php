<?php

class Book
{
        public function __construct(
                public string $title,
                public string $author,
                public string $publicationTime,
                public string $difficulty,
                public int $pageCount,
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

$books = array(
        new Book('Clean Code: A Handbook of Agile Software Craftsmanship', 'Robert C. Martin', 'XXXX', '-', -25 + 345, 'Naming - Formating'),
        new Book('Head First Design Patterns', 'O\'Reilly', 'XXXX', '-', 629, 'Singleton')
);

function displayBookCatalog($catalog, $showId = true)
{
        displayBookCatalogHeader();
        displayBookCatalogBody($catalog, $showId);
}

function displayBookCatalogHeader()
{
        echo '
                 <thead>
                        <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Author</th>
                                <th>Publication time</th>
                                <th>Difficulty</th>
                                 <th>Page count</th>
                                <th>Topics</th>
                        </tr>
                </thead>      
        ';
}

function displayBookCatalogBody($catalog, $showId)
{
        echo '<tbody>';
        for ($i = 0; $i < count($catalog); $i++) {
                $catalog[$i]->displayRow($showId, $i + 1);
        }
        echo '</tbody>';
}
?>

<div class="portfolio-single modal fade" id="bookshelf" tabindex="-1" role="dialog" aria-labelledby="bookshelfModalScrollable" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable" role="document">
                <div class="modal-content text-muted">
                        <div class="modal-header">
                                <h5 class="modal-title " id="bookshelfModalScrollable">Bookshelf</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                </button>
                        </div>
                        <div class="modal-body">
                                <div class="pt-4 pb-5">
                                        <div class="container">
                                                <div class="row  justify-content-center">
                                                        <table class="neumorphic">
                                                                <?php displayBookCatalog($books) ?>
                                                        </table>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
        </div>
</div>