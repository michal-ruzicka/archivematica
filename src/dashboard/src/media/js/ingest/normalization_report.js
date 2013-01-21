$(function() {
  // add job viewer to generate dialogs with
  var job = new Job();
  job.set({'type': 'Approve Normalization'});
  job.sip = new Sip();
  job.sip.set({'directory': '{{ sipname }}'});
  var jobView = new BaseJobView({model: job});

  // add popovers
  $($.find('a.file-location'))
    .popover({
      trigger: 'hover',
      content: function()
        {
            return $(this).attr('data-location').replace(/%.*%/gi, '');
        }
    })
    .click(function(event) {
      event.preventDefault();
    });

  // make it so clicking on job shows details
  $('.normalization-report-task').each(function() {
    var taskUUID = $(this).attr('id').replace('normalization-report-task-', '');
    $(this).click(function() {
      $.ajax({
        context: this,
        type: 'GET',
        dataType: 'html',
        success: function(jobData)
        {
          jobView.taskDialog(jobData, { width: 950 });

          // localize UTC dates
          $('.utcDate').each(function() {
            $(this).text(utcDateToLocal($(this).text()));
          });
        },
        url: '/task/' + taskUUID + '/'
      });
    });
  });
});