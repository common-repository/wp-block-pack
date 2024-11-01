// Accordion

var accordionPanels = document.querySelectorAll(".accordion-panel");
for (var i = 0; i < accordionPanels.length; i++) {
	var accordionTitle = accordionPanels[i].children[0];
	var accordionPanel = accordionPanels[i];
	var accordionPanelClass = accordionPanel.classList[1];

	accordionTitle.addEventListener("click", function(){
		var toggle = this.parentNode.classList[1];
		if (toggle == 'open') {
			this.parentNode.classList.remove('open');
			this.parentNode.classList.add('close');
		} else {
			this.parentNode.classList.remove('close');
			this.parentNode.classList.add('open');
		}
	})
}

// Tabs
var tabsTitle = document.querySelectorAll(".tabs-header .tab-title");
for (var i = 0; i < tabsTitle.length; i++) {
	var tabTitle = tabsTitle[i];

	tabTitle.addEventListener("click", function(){
		var activeTab = this.parentNode.parentNode.classList[1];
		var activeNum = activeTab.split('-')[1];
		var dataTab = this.attributes["data-tab"].value;
		var nowActive = Number(activeNum) - 1;
		
		if (activeNum != dataTab){
			this.parentNode.parentNode.classList.remove('active-' + activeNum);
			this.parentNode.childNodes[nowActive].classList.remove('active');
			this.parentNode.parentNode.classList.add('active-' + dataTab);
			this.classList.add('active');
		}
	})
}

// Counter
var WPBPCounter = document.querySelectorAll('.wp-block-pack-counter');

if (WPBPCounter.length > 0) {

	var numberToAnimate = document.querySelectorAll('.individual-counter-number span');

	

	// Make every counter become zero, onload
	window.onload = function() {
		for (var i = 0; i< numberToAnimate.length; i++) {
			numberToAnimate[i].innerHTML = 0;
		}

		// For each counter area
		WPBPCounter.forEach(function( eachCounterSection ){
			if (!eachCounterSection.classList.contains('counted')){
				var PageYValue = window.pageYOffset + window.innerHeight;
				var CounterYValue = eachCounterSection.offsetTop;
				if (PageYValue > CounterYValue) {
					WPBPCountUp(eachCounterSection);
				}
			}
		})
	};


	window.onscroll = function() {

		// For each counter area
		WPBPCounter.forEach(function( eachCounterSection ){
			if (!eachCounterSection.classList.contains('counted')){
				var PageYValue = window.pageYOffset + window.innerHeight;
				var CounterYValue = eachCounterSection.offsetTop;
				if (PageYValue > CounterYValue) {
					WPBPCountUp(eachCounterSection);
				}
			}
		})
	};
}

function WPBPCountUp(a) {

	a.classList.add('counted');

	// Each number
	var numberToAnimate = a.querySelectorAll('.individual-counter-number span');

    // For each individual counter area
    numberToAnimate.forEach(function( eachCounterNumber ){

		var dataNumber = eachCounterNumber.getAttributeNode("data-number").value;
		var targetTime = 3000; //in milliseconds
		var updateTime = Math.floor(targetTime / dataNumber); // in milliseconds
		var b = 0;
		if (updateTime < 20) {
			// problem
			var updateTime = 20;
		}

		function count() {
			if(dataNumber > b) {
				if (updateTime <= 20) {
					var fireTimes = targetTime / 20; // amount of function call
					var increament = Math.ceil(dataNumber / fireTimes); // how many number to add for each call
					eachCounterNumber.innerHTML = b;
					b = b+increament;
				} else {
					eachCounterNumber.innerHTML = b;
					b++;
				}
				setTimeout(count, updateTime);
			} else {
				eachCounterNumber.innerHTML = dataNumber;
			}

        }
	    count();

    })

}