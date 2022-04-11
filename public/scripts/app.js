// Client facing scripts here
/*
$(() => {

    const $filterArtistsForm = $(`
    <form action="/artists" method="get" id="filter-artists-form" class="filter-artists-form">
        <div class="search-property-form__field-wrapper">
          <label for="search-property-form__city">City</label>
          <input type="text" name="artist" placeholder="Artist" id="filter-artists-form__artist">
        </div>
  
        <div class="filter-artists-form__field-wrapper">
            <button>Search</button>
            <a id="filter-artists-form__cancel" href="#">Cancel</a>
        </div>
      </form>
    `)
    window.$filterArtistsForm = $filterArtistsForm;
  
    $filterArtistsForm.on('submit', function(event) {
      event.preventDefault();
      const data = $(this).serialize();
      const $main = $('#main-content');
      getAllArtists(data).then(function( json ) {
        ArtistListings.addArtists(json.artists);
        $propertyListings.appendTo($main);
        //views_manager.show('listings');
      });
    });
  
    $('body').on('click', '#filter-artists-form__cancel', function() {
      views_manager.show('listings');
      return false;
    });
  
  });

  */