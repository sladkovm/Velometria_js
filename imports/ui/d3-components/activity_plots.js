/**
 * Created by sladkovm on 27/01/16.
 */

var visPowerPlot;

Template.activity_plots.onRendered(function(){
    //console.log('activityPlots.onRendered()...');
    this.autorun(function(){
        //console.log('activityPlots.onRendered(): ', Session.get('clickedActivityId'));
        Template.currentData(); // hack to force the autorun to reevaluate

        var d3PowerLine = new lineCanvas("#d3PowerPlot", Session.get('d3Data'));

    })
});

