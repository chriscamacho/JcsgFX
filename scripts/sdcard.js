CSG = Java.type("eu.mihosoft.vrl.v3d.CSG")
Vector3d = Java.type("eu.mihosoft.vrl.v3d.Vector3d")
Extrude =  Java.type("eu.mihosoft.vrl.v3d.Extrude")

function main() {
        // data taken from
        // https://www.sparkfun.com/datasheets/Prototyping/microSD_Spec.pdf
        // total card width
        A = 10.9;
        // front width
        A1 = 9.6;

        A8 = 0.6;

        // total card length
        B = 14.9;

        B1 = 6.3;

        // slit pos relative to front
        B10 = 7.8;

        // slit thickness
        B11 = 1.1;

        // total card thickness 
        C1 = 0.6;

        A_ = A - A1;
        B_ = B - B1 + A_;

        return Extrude.points(new Vector3d(0, 0, C1),
                new Vector3d(0, 0),
                new Vector3d(A, 0),
                new Vector3d(A, B),
                new Vector3d(A_, B),
                new Vector3d(A_, B_),
                new Vector3d(0, B - B1),
                new Vector3d(0, B - B10),
                new Vector3d(A8, B - B10),
                new Vector3d(A8, B - B10 - B11),
                new Vector3d(0, B - B10 - B11 - A8)
        );
}


