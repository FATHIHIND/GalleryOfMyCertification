var	$parent = document.querySelector("#main"),
		$aside = document.querySelector("#aside"),
		$asideTarget = $aside.querySelector(".aside--details"),
		$asideClose = $aside.querySelector(".close"),
		$tilesParent = document.querySelector(".tiles-a"),
		$tiles = $tilesParent.querySelector("a"),
		slideClass = "show-detail";

		// tile click
		$tiles.addEventListener("click", function(e){
			e.preventDefault();
			e.stopPropagation();
			if(!document.documentElement.classList.contains(slideClass)){
				$tiles.removeClass("active");
				document.querySelector(this).classList.add("active");
				document.querySelector(this).attr("aria-expanded","true");
				loadTileData(document.querySelector(this));
			}else{
				killAside();
				document.querySelector(this).attr("aria-expanded","false");
			}
		});

		// kill aside
		$asideClose.addEventListener("click", function(e){
			e.preventDefault();
			killAside();
		});

		// load data to aside
		function loadTileData(target){
			var $this = document.querySelector(target),
					itemHtml = $this.querySelector(".details").html();
					$asideTarget.html(itemHtml);
					showAside();
		}

		// show/hide aside
		function showAside(){
			if(!document.documentElement.classList.contains(slideClass)){
				document.documentElement.classList.toggle(slideClass);
				$aside.attr("aria-hidden","false");
				focusCloseButton();
			}
		}
		
		// handle esc key
		window.addEventListener("keyup", function(e){

			// grab key pressed
			var code = (e.keyCode ? e.keyCode : e.which);
			
			// escape
			if(code === 27){
				killAside();
			}

		}, false);

		// kill aside
		function killAside(){
			if(document.documentElement.classList.contains(slideClass)){
				document.documentElement.removeClass(slideClass);
				sendFocusBack();
				$aside.attr("aria-hidden","true");
				$tiles.attr("aria-expanded","false");
			}
		}

		// send focus to close button
		function focusCloseButton(){
			$asideClose.focus();	
		}

		// send focus back to item that triggered event
		function sendFocusBack(){
			document.querySelector(".active").focus();
		}

		// handle body click to close off-canvas
		$parent.addEventListener("click",function(e){
			if(document.documentElement.classList.contains(slideClass)){
				killAside();
			}
		});
		
