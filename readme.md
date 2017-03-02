This quick rough and ready hack was inspired by

https://github.com/miho/JFXScad

For my personal tastes JFXScad had lots of dependencies that could
be done without, additionally for me JavaScript seemed a better fit than
Groovy.

Neither approach is better, just different.

JcsgFX uses only JavaFX, JCSG and its dependencies (a logger and vector math
library)

Please see the readme.md in the deps folder, you should at least create
the CSG javadoc and familiarise yourself with the CSG object.

There is plenty of room for improvement see any comment starting TODO.

Feedback for errors is minimal consisting of a stacktrace if you are lucky!




Controls

you can load / save javascript from/to the code window via the menu

given valid javascript in the code window (a function "main"
that returns a CSG object) the resulting model can be exported to
STL

Whenever code is edited, once you are happy with the edits, shift enter
to execute the code and view the results in the 3d window.

The camera can be orbited by dragging the mouse inside the 3d window and
moved back and forth with the mouse wheel

Enjoy!


