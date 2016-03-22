var draw=function(H){var F=document.getElementById("top20tags").getContext("2d");var D=document.getElementById("popularityChange").getContext("2d");var C=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");var A=H.getDate();var G=H.getMonth();var B=H.getFullYear();var E="data/"+B+"/"+C[G]+"/"+A+"/top100tags.json";$.ajax({url:E,error:function(I){if(I.status=="404"){currTry=currTry+1;if(maxPrevDays>currTry){$today=new Date();$yesterday=new Date($today);$yesterday.setDate($today.getDate()-currTry);draw($yesterday)}}},success:function(R){var R=JSON.parse(R);var S=new Array();var K=new Array();for(var O=0;O<20;O++){S[S.length]=R.items[O].name;K[K.length]=R.items[O].count}var P=new Array();var L=new Array();R.items.sort(function(V,U){return U.popularityChange-V.popularityChange});for(var N=0;N<20;N++){P[N]=R.items[N].popularityChange;L[N]=R.items[N].name}var Q={labels:L,datasets:[{label:"Top 20 Tags by popularity",fillColor:"rgba(220,220,220,0.5)",strokeColor:"rgba(220,220,220,0.8)",highlightFill:"rgba(220,220,220,0.75)",highlightStroke:"rgba(220,220,220,1)",data:P}]};var M={labels:S,datasets:[{label:"Top 20 Tags by popularity",fillColor:"rgba(220,220,220,0.5)",strokeColor:"rgba(220,220,220,0.8)",highlightFill:"rgba(220,220,220,0.75)",highlightStroke:"rgba(220,220,220,1)",data:K}]};var T={scaleBeginAtZero:true,scaleShowGridLines:true,scaleGridLineColor:"rgba(0,0,0,.05)",scaleGridLineWidth:1,scaleShowHorizontalLines:true,scaleShowVerticalLines:false,barShowStroke:true,barStrokeWidth:2,barValueSpacing:5,barDatasetSpacing:1,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'};var I=new Chart(F).Bar(M,T);var J=new Chart(D).Bar(Q,T)},async:false})};var maxPrevDays=5;var currTry=0;var loadOnAjax=function(){var A=new Date();draw(A)};$.ajax({url:"/js/components/Chart.min.js",success:loadOnAjax,async:false});