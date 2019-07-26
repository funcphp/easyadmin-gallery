var bricklayer = new Bricklayer(document.querySelector('.bricklayer'));

'use strict';

;( function( $, window, document, undefined )
{
    // feature detection for drag&drop upload

    var isAdvancedUpload = function()
    {
        var div = document.createElement( 'div' );
        return ( ( 'draggable' in div ) || ( 'ondragstart' in div && 'ondrop' in div ) ) && 'FormData' in window && 'FileReader' in window;
    }();


    // applying the effect for every form

    $( '.upload__container' ).each( function()
    {
        var $document    = $(document),
            $container   = $( this ),
            $form        = $container.find('form'),
            $input		 = $form.find( 'input[type="file"]' ),
            $label		 = $form.find( 'label.selected-info' ),
            $errorMsg	 = $form.find( '.box__error span' ),
            $restart	 = $form.find( '.box__restart' ),
            droppedFiles = false,
            showFiles	 = function( files )
            {
                $label.text( files.length > 1 ? ( $input.attr( 'data-multiple-caption' ) || '' ).replace( '{count}', files.length ) : files[ 0 ].name );
            }
        ;

        $container.on('click', function(e) {
            if ($(e.target).is($container) && ($form.hasClass('is-success') || $form.hasClass('is-error'))) {
                $container.removeClass('active');
                $form.removeClass('is-uploading is-error is-success is-dragover is-selected');
            }
        });

        // letting the server side to know we are going to make an Ajax request
        $form.append( '<input type="hidden" name="ajax" value="1" />' );

        // automatically submit the form on file select
        $input.on( 'change', function( e )
        {
            showFiles( e.target.files );


        });


        // drag&drop files if the feature is available
        if( isAdvancedUpload )
        {
            $form.addClass( 'has-advanced-upload' );
            $document
                .on( 'drag dragstart dragend dragover dragenter dragleave drop', function( e )
                {
                    // preventing the unwanted behaviours
                    e.preventDefault();
                    e.stopPropagation();
                })
                .on( 'dragover dragenter', function() //
                {
                    $container.addClass('active');
                    $form.addClass( 'is-dragover' );
                })
                .on( 'dragleave dragend drop', function()
                {
                    $form.removeClass( 'is-dragover' );
                })
                .on( 'drop', function( e )
                {
                    if (!$form.hasClass('is-dragover is-uploading')) {
                        droppedFiles = e.originalEvent.dataTransfer.files; // the files that were dropped
                        showFiles( droppedFiles );
                        $form.removeClass('is-selected');
                        if (droppedFiles.length)
                            $form.addClass('is-selected');
                    }
                })
            ;
        }


        // if the form was submitted

        $form.on( 'submit', function( e )
        {
            // preventing the duplicate submissions if the current one is in progress
            if( $form.hasClass( 'is-uploading' ) ) return false;

            $form.addClass( 'is-uploading' ).removeClass( 'is-error' );

            if( isAdvancedUpload ) // ajax file upload for modern browsers
            {
                e.preventDefault();

                // gathering the form data
                var ajaxData = new FormData( $form.get(0) );
                console.log(ajaxData);
                if( droppedFiles )
                {
                    $.each( droppedFiles, function( i, file )
                    {
                        ajaxData.append( $input.attr( 'name' ), file );
                    });
                }

                // ajax request
                $.ajax(
                    {
                        url: 			$form.attr( 'action' ),
                        type:			$form.attr( 'method' ),
                        data: 			ajaxData,
                        dataType:		'json',
                        cache:			false,
                        contentType:	false,
                        processData:	false,
                        complete: function()
                        {
                            $form.removeClass( 'is-uploading' );
                        },
                        success: function( data )
                        {
                            if (data.success) {
                                $form.addClass('is-success');
                                setTimeout(function() { location.reload() }, 2000);
                            }
                            else {
                                $form.addClass('is-error');
                            }
                            if( !data.success ) $errorMsg.text( data.error );
                        },
                        error: function()
                        {
                            $form.addClass('is-error');
                            //$form.get(0)reset();
                            alert( 'Error. Please, contact the webmaster!' );
                        }
                    });
            }
            else // fallback Ajax solution upload for older browsers
            {
                var iframeName	= 'uploadiframe' + new Date().getTime(),
                    $iframe		= $( '<iframe name="' + iframeName + '" style="display: none;"></iframe>' );

                $( 'body' ).append( $iframe );
                $form.attr( 'target', iframeName );

                $iframe.one( 'load', function()
                {
                    var data = $.parseJSON( $iframe.contents().find( 'body' ).text() );
                    $form.removeClass( 'is-uploading' ).addClass( data.success == true ? 'is-success' : 'is-error' ).removeAttr( 'target' );
                    if( !data.success ) $errorMsg.text( data.error );
                    $iframe.remove();
                });
            }
        });


        // restart the form if has a state of error/success

        $restart.on( 'click', function( e )
        {
            e.preventDefault();
            $form.removeClass( 'is-error is-success' );
            $input.trigger( 'click' );
        });

        // Firefox focus bug fix for file input
        $input
            .on( 'focus', function(){ $input.addClass( 'has-focus' ); })
            .on( 'blur', function(){ $input.removeClass( 'has-focus' ); });
    });

})( jQuery, window, document );