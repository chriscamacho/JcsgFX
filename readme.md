This quick rough and ready hack was inspired by

https://github.com/miho/JFXScad

For my personal tastes JFXScad had lots of dependencies that could
be done without, additionally for me JavaScript seemed a better fit than
Groovy.

Neither approach is better, just different.

JcsgFX uses only JavaFX, JCSG and its dependencies (a logger and matrix
library).

Please see the readme.md in the deps folder, you should at least create
the CSG javadoc and familiarise yourself with the CSG object.

There is plenty of room for improvement see any comment starting TODO.

Feedback for errors is minimal consisting of a stacktrace if you are lucky
The most important feedback to implement is proper error reporting when
there is an error running the loaded script.


Controls

just above the code window there a number of buttons

you can load / save javascript from/to the code window

given valid javascript in the code window (a function "main"
that returns a CSG object) the resulting model can be exported to
STL

Whenever code is edited, once you are happy with the edits, click
the update button to execute the code and view the results in the
3d window.

The camera can be orbited by dragging the mouse inside the 3d window

Enjoy!


