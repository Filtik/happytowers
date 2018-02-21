// ==UserScript==
// @name         Happy Towers
// @namespace    Happy Towers - magic
// @version      0.3.5
// @updateURL    https://github.com/Filtik/happytowers/happytowers.js
// @downloadURL  https://github.com/Filtik/happytowers/happytowers.js
// @description  try to take over the world!
// @author       Filtik
// @grant        none

// @match        http://happytowers.de/*
// @require      https://code.jquery.com/jquery-3.2.1.js
// ==/UserScript==



    (function() {
        console.log("Starting"); //debug
        var href,
			reloadtime = 1,
			backtohome = false,
			investorenclick = false,
			actionclick = false,
            investoren = [
                'a.btn60:contains("Verhandlungen beginnen")',
                'a.btn60:contains("Ja ist es!")',
                'a.btn60:contains("Ja, natürlich!")',
                'a.btn60:contains("Ja, das ist es!")',
                'a.btn60:contains("Ja, die haben wir!")',
                'a.btn60:contains("Ja, können wir!")',
                'a.btn60:contains("Wir sind die besten!")',
                'a.btn60:contains("Aktualisieren")',
            ],
            actions = [
                'a:contains("Belohnung abholen")',
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
                'a.tdu:contains("Einen Besucher befördern")',
                'a.tdu:contains("In Etage")',
                'a[href="quests"]',
                'a[href*="toolbarPanel:guildBoxQuestAward::ILinkListener::"]',
            ];

        for(var i = 0; !href && i < investoren.length; i++) {
            var query = $(investoren[i]);
			investorenclick = false;
            if(query.length) {
                console.log("I want to investoren click: ", investoren[i], query[0].href); //debug
                href = query[0].href;
				investorenclick = true;
				reloadtime = 6;
				if (investoren[i].indexOf('Aktualisieren') >= 0) {
					backtohome = true;
				}
            }
        }

        for(var i = 0; !href && i < actions.length; i++) {
            var query = $(actions[i]);
			actionclick = false;
            if(query.length) {
				console.log("I want to click: ", actions[i], query[0].href); //debug
				href = query[0].href;
				actionclick = true;
            }
        }

        if (href) {
            console.log("Clicking link! " + href);
            setTimeout(function() {
                tolink(href, backtohome);
            }, reloadtime * 1000);

        } else {
            var rand = Math.floor((Math.random() * 271) + 30 * 1000);
            var today = new Date();
            console.log('Now: ' + converttotime(today));

            var nextreload = new Date(today);
            nextreload.setSeconds(nextreload.getSeconds() + rand);

            var h = today.getHours();
            var d = addZero(today.getDate());
            var mm = addZero(today.getMonth());
            var y = today.getFullYear();

            if (h == 1) {
                nextreload = new Date(y, mm, d, 6, 0, 30);
                rand = nextreload - today.getTime();
            }
            console.log('Waiting ' + Math.floor(rand / 1000) + ' seconds...');

            console.log('Next reload: ' + converttotime(nextreload));

            setTimeout(function() {
                tohome();
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

    if (n == -60) {
        var reloadtime2 = new Date(y, mm, d, 22, 0, 30);
    } else if (n == -120) {
        var reloadtime2 = new Date(y, mm, d, 23, 0, 30);
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
		tohome();
	}
    else {
        window.location.href = href;
    }
}

function tohome() {
    window.location.href="http://happytowers.de/home";
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