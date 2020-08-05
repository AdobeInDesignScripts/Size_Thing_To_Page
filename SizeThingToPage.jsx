//SizeThingToPage.jsx
//An InDesign ExtendScript by Silicon Publishing, Inc.
//
//Resizes the current selection to the size of the page. 
/*
    Notes:

    * If the selection contains graphics, the graphics will be scaled according to the frame fitting options of their
      containing frames. If no frame fitting options are specified, only the frame will be scaled.
      
    * If the selection contains text, only the frame will be scaled. Text will remain the same size.
*/
main();

function main(){
    if(app.documents.length > 0){
        if(app.documents.item(0).selection.length > 0){
            try{
                var thing = document.selection;
                var page = document.selection[0].parentPage;
                //If the thing is on the pasteboard, parentPage will be undefined, so we need to handle that case.
                if(page == undefined){
                    var activeWindow = app.activeWindow;
                    page = activeWindow.activePage;
                }                
                if(document.selection.length > 1){
                    thing = page.groups.add(document.selection);
                }
                else{
                    thing = thing[0];
                }
                sizeThingToPage(page, thing);
            }
            catch(error){
                alert("Error sizing thing to page. " + error.message);
            }
        }
        else{
            alert("Please select a page item and try again.");
        }
    }
    else{
        alert("Please open a document, select a page item, and try again.");
    }
}

function sizeThingToPage(page, thing){
	if(page.constructor.name == "Spread"){
		topLeft = page.pages.item(0).resolve(AnchorPoint.TOP_LEFT_ANCHOR, CoordinateSpaces.PASTEBOARD_COORDINATES)[0];
		bottomRight = page.pages.item(1).resolve(AnchorPoint.BOTTOM_RIGHT_ANCHOR, CoordinateSpaces.PASTEBOARD_COORDINATES)[0];
	}
	else{
		topLeft = page.resolve(AnchorPoint.TOP_LEFT_ANCHOR, CoordinateSpaces.PASTEBOARD_COORDINATES)[0];
		bottomRight = page.resolve(AnchorPoint.BOTTOM_RIGHT_ANCHOR, CoordinateSpaces.PASTEBOARD_COORDINATES)[0];
	}
	thing.reframe(CoordinateSpaces.PASTEBOARD_COORDINATES, [topLeft, bottomRight]);		
}
