/*File: part2.js
    GUI Assignment: HW4 Part 2
    Jordy Guzman, UMass Lowell Computer Science, Jordy_guzmanalcaraz@student.uml.edu (c) 2023 
    by Guzman. All rights reserved. May be freely copied or excerpted for educational 
    purposes with credit to the author.
*/
$(document).ready(function() {
    $.validator.addMethod("greaterThanOrEqualTo", function(value, element, param) {
        var otherValue = $(param).val();
        return parseInt(value) >= parseInt(otherValue);
      }, "Maximum must be greater than or equal to Minimum");
      $.validator.addMethod("noFloats", function(value, element) {
        return this.optional(element) || /^\d+$|^-\d+$/.test(value);
      }, "Please enter a valid integer (positive or negative)");

      /* Set default value to 0 for each input */
      $("#MinCol").val(0);
      $("#MaxCol").val(0);
      $("#MinRow").val(0);
      $("#MaxRow").val(0);

      /* Setting Min and Max to Sliders */
      $("#slider1").slider({
        min: -50,
        max: 50,
        /* When slider is moved, create new table */
        slide: function(event, ui) {
            $("#MinCol").val(ui.value);
            $('#submit').click();
          }
      });
      /* Setting Min and Max to Sliders */
      $("#slider2").slider({
        min: -50,
        max: 50,
        slide: function(event, ui) {
            $("#MaxCol").val(ui.value);
            $('#submit').click();
        }
      });
      /* Setting Min and Max to Sliders */
      $("#slider3").slider({
        min: -50,
        max: 50,
        slide: function(event, ui) {
            $("#MinRow").val(ui.value);
            $('#submit').click();
        }
      });
      /* Setting Min and Max to Sliders */
      $("#slider4").slider({
        min: -50,
        max: 50,
        slide: function(event, ui) {
            $("#MaxRow").val(ui.value);
            $('#submit').click();
        }
      });
      $("#MinCol").on('input', function() {
        var userInput = $(this).val();
        // Check if the input value is a valid number between the slider min and max values
        if (userInput >= -50 && userInput <= 50) {
          $("#slider1").slider("value", userInput); // Update slider value
          $("#submit").click();
        }
      });
      $("#MaxCol").on('input', function() {
        var userInput = $(this).val();
        // Check if the input value is a valid number between the slider min and max values
        if (userInput >= -50 && userInput <= 50) {
          $("#slider2").slider("value", userInput); // Update slider value
          $("#submit").click();
        }
      });
      $("#MinRow").on('input', function() {
        var userInput = $(this).val();
        // Check if the input value is a valid number between the slider min and max values
        if (userInput >= -50 && userInput <= 50) {
          $("#slider3").slider("value", userInput); // Update slider value
          $("#submit").click();
        }
      });
      $("#MaxRow").on('input', function() {
        var userInput = $(this).val();
        // Check if the input value is a valid number between the slider min and max values
        if (userInput >= -50 && userInput <= 50) {
          $("#slider4").slider("value", userInput); // Update slider value
          $("#submit").click();
        }
      });

      var tabCounter = 0; // Keep track of the number of tabs created initially
      // Initialize tabs
      $("#tabs").tabs();

      // Create a new tab and add table to it
      $("#save").on("click", function() {
          var Table = $("#MultTable").html();
          var numTabs = $("#tabs ul li").length + 1;
          var tabTitle = $("#MinCol").val() + " to " + $("#MaxCol").val() 
            + " by " + $("#MinRow").val() + " to " + $("#MaxRow").val();
          var tabContent = "<div id='tabs-" + numTabs + "'>" + "<table>" + Table + "</table>" + "</div>";

          $("#tabs ul").append("<li><a href='#tabs-" + numTabs + "'>" + tabTitle + "<span class='ui-icon ui-icon-close ui-tabs-close'></span>" + "</a></li>");
          $("#tabs").append(tabContent);

          $("#tabs").tabs("refresh");
      });
      
      // Delete tab when "x" is clicked
      var tabs = $("#tabs").tabs();
      tabs.find(".ui-tabs-nav").on("click", "span.ui-tabs-close", function() {
          var panelId = $(this).closest("li").remove().attr("aria-controls");
          $("#" + panelId).remove();
          tabs.tabs("refresh");
      });

      //Delete all tabs when button is clicked
      $("#DeleteAll").on("click", function() {
          tabs.find(".ui-tabs-nav li").remove();
          tabs.find(".ui-tabs-panel").remove();
          tabs.tabs("refresh");
      });
    //Rules for form input
    $("#TableForm").validate({
      //Min, and Max set for form input. No floats allowed. Integers only
      rules: {
        MinCol: {
            required: true,
            min: -50,
            max: 50,
            noFloats: true
        },
        MaxCol: {
            required: true, 
            min: -50, 
            max: 50,
            greaterThanOrEqualTo: "#MinCol",
            noFloats: true
        },
        MinRow: {
            required: true,
            min: -50,
            max: 50,
            noFloats: true
        },
        MaxRow: {
            required: true,
            min: -50,
            max: 50,
            greaterThanOrEqualTo: "#MinRow",
            noFloats: true
        }
      },
      //Print error messages if input is invalid
      messages: {
        MinCol: {
            required: "Please enter an integer value",
            min: "Value must be between -50 to 50",
            max: "Value must be between -50 to 50",
            noFloats: "Please enter a valid integer"
        },
        MaxCol: {
            required: "Please enter an integer value", 
            min: "Value must be between -50 to 50",
            max: "Value must be between -50 to 50",
            noFloats: "Please enter a valid integer"
        },
        MinRow: {
            required: "Please enter an integer value",
            min: "Value must be between -50 to 50",
            max: "Value must be between -50 to 50",
            noFloats: "Please enter a valid integer"
        },
        MaxRow: {
            required: "Please enter an integer value",
            min: "Value must be between -50 to 50",
            max: "Value must be between -50 to 50",
            noFloats: "Please enter a valid integer"
        },
        errorClass: "error",
      },
      //if valid, create a multiplication table using the entered values.
      submitHandler: function(form) {
        var MinCol = document.getElementById('MinCol').value;
        var MaxCol = document.getElementById('MaxCol').value;
        var MinRow = document.getElementById('MinRow').value;
        var MaxRow = document.getElementById('MaxRow').value;
        //Create variable that stores table
        const tableContainer = document.getElementById('MultTable');
        //Dynamically Create table based on user input values
        let table = '<table>';
        for (let i = MinRow - 1; i <= MaxRow; i++) {
            table += '<tr>';
            for (let j = MinCol - 1; j <= MaxCol; j++) {
                if (i === MinRow - 1 && j === MinCol - 1) {
                    table += `<th></th>`;
                } else if (i === MinRow - 1) {
                    table += `<th>${j}</th>`;
                } else if (j === MinCol - 1) {
                    table += `<th>${i}</th>`;
                } else {
                    table += `<td>${(i * j)}</td>`;
            }
            }
            table += '</tr>';
        }
        table += '</table>';
        tableContainer.innerHTML = table;
      }
    });
  });