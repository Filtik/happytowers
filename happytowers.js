// ==UserScript==
// @name         Happy Towers
// @namespace    Happy Towers - magic
// @version      0.3.8
// @updateURL    https://raw.githubusercontent.com/Filtik/happytowers/master/happytowers.js
// @downloadURL  https://raw.githubusercontent.com/Filtik/happytowers/master/happytowers.js
// @description  try to take over the world!
// @author       Filtik
// @grant        none

// @match        http://happytowers.de/*
// @require      https://code.jquery.com/jquery-3.2.1.js
// ==/UserScript==



    (function() {
        console.log("Starting"); //debug
        var href,
			reloadtime = 0.8,
			backtohome = false,
            investoren = [
                'a.btn60:contains("Belohnung abholen!")',
                'a.btn60:contains("Verhandlungen beginnen")',
                'a.btn60:contains("Ja ist es!")',
                'a.btn60:contains("Ja, natürlich!")',
                'a.btn60:contains("Ja, das ist es!")',
                'a.btn60:contains("Ja, die haben wir!")',
                'a.btn60:contains("Ja, können wir!")',
                'a.btn60:contains("Wir sind die besten!")'
            ],
            actions = [
                'span.flr a[href="lobby"]',
                'span.flr a[href="city/coll"]',
                'span.flr a[href="city/box/quests"]',
                'a.cntr[href="city/coll"]',
                'a.amount[href="city/box/quests"]',
                'a.btn60:contains("Aufgabe bekommen")',
                'a.btn60:contains("Abgeschlossen!")',
                'a.btn60:contains("Öffnen")',
                'a.tdn:contains("Etagen anzeigen")',
                'a.tdu:contains("Münzen sammeln!")',
                'a.tdu:contains("Waren verkaufen")',
                'a.tdu:contains("Waren kaufen")',
                'a.tdu:contains("Trinkgeld bekommen")',
                'a.tdu:contains("Kaufen für")',
                'a.tdu:contains("Große Eröffnung!")',
                'a:contains("Schneebälle")',
                'a:contains("Wurf")',
                'a:contains("Belohnung abholen!")',
                'a.tdu:contains("Einen Besucher befördern")',
                'a.tdu:contains("In Etage")',
                'a[href="quests"]',
                'a[href*="toolbarPanel:guildBoxQuestAward::ILinkListener::"]',
                'a.btn60:contains("Aktualisieren")'
            ];

        for(var i = 0; !href && i < investoren.length; i++) {
            var query = $(investoren[i]);
            if(query.length) {
                console.log("I want to investoren click: ", investoren[i], query[0].href); //debug
                href = query[0].href;
				reloadtime = 6;
            }
        }

        for(var j = 0; !href && j < actions.length; j++) {
            var query2 = $(actions[j]);
            if(query2.length) {
				console.log("I want to click: ", actions[j], query2[0].href); //debug
				href = query2[0].href;
				if (actions[j].indexOf('Aktualisieren') >= 0) {
					backtohome = true;
				}
            }
        }

        if (href) {
            console.log("Clicking link! " + href);
            setTimeout(function() {
                tolink(href, backtohome);
            }, reloadtime * 1000);

        } else {
            var rand = Math.floor(((Math.random() * 271) + 30) * 1000);
            var today = new Date();
            console.log('Now: ' + converttotime(today));

            var nextreload = new Date(today);
            nextreload.setMilliseconds(nextreload.getMilliseconds() + rand);

            var h = today.getHours();
            var d = addZero(today.getDate());
            var mm = addZero(today.getMonth());
            var y = today.getFullYear();

            if (h == 0) {
                nextreload = new Date(y, mm, d, 6, 0, 30);
                rand = nextreload - today.getTime();
            }
            console.log('Waiting ' + Math.floor(rand / 1000) + ' seconds...');

            console.log('Next reload: ' + converttotime(nextreload));

            setTimeout(function() {
                tolink(0, true);
            }, Math.floor(rand));
			get_time_diff();
        }
    })();

function get_time_diff() {
    var today = new Date();
    var d = addZero(today.getDate());
    var mm = addZero(today.getMonth());
    var y = today.getFullYear();

    var n = today.getTimezoneOffset();

    var now = new Date().getTime();
    var reloadtime1 = new Date(y, mm, d, 20, 30, 30);
    var reloadtime2;

    if (n == -60) {
        reloadtime2 = new Date(y, mm, d, 22, 0, 30);
    } else if (n == -120) {
        reloadtime2 = new Date(y, mm, d, 23, 0, 30);
    }


	if (reloadtime1 < now) {
        reloadtime1.setDate(reloadtime1.getDate() + 1);
	}
	if (reloadtime2 < now) {
        reloadtime2.setDate(reloadtime2.getDate() + 1);
	}

    var diff;
    var diff1 = reloadtime1.getTime() - now;
    var diff2 = reloadtime2.getTime() - now;

    if (diff1 < diff2 && diff1 > 0) {
        diff = diff1;
    } else if (diff2 < diff1 && diff2 > 0) {
        diff = diff2;
    }
	console.log('Next force reload: ' + converttotime(now+(diff)));
	diff = Math.floor(diff/1000);

	setTimeout(function() {
		tohome();
	}, diff * 1000);
}

function tolink(href, backtohome) {
	if (backtohome) {
		window.location.href="http://happytowers.de/home";
	}
    else {
        window.location.href = href;
    }
}

function converttotime(time) {
	var today = new Date(time);
	var h = addZero(today.getHours());
	var m = addZero(today.getMinutes());
	var s = addZero(today.getSeconds());
	var d = addZero(today.getDate());
	var mm = addZero(today.getMonth()+1); //January is 0!
	var y = today.getFullYear();
	var now = d+'.'+mm+'.'+y+' '+h+':'+m+':'+s;

	return now;
}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}