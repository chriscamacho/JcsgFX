CSG = Java.type("eu.mihosoft.jcsg.CSG")
Extrude = Java.type("eu.mihosoft.jcsg.Extrude")

Vector3d = Java.type("eu.mihosoft.vvecmath.Vector3d")
Transform = Java.type("eu.mihosoft.vvecmath.Transform")
Matrix3d = Java.type("eu.mihosoft.jcsg.Matrix3d")

Vertex = Java.type("eu.mihosoft.jcsg.Vertex")
Polygon = Java.type("eu.mihosoft.jcsg.Polygon")

Sphere = Java.type("eu.mihosoft.jcsg.Sphere")
Cube = Java.type("eu.mihosoft.jcsg.Cube")
Cylinder = Java.type("eu.mihosoft.jcsg.Cylinder")
RoundedCube = Java.type("eu.mihosoft.jcsg.RoundedCube")

function main() {

	maxR = 10;

        w = 30;
        h = 30;
        d = 30;

        // optimization reduces runtime dramatically
        CSG.setDefaultOptType(CSG.OptType.POLYGON_BOUND);

        spheres = null;

        for(i = 0;i<70;i++) {
            s = new Sphere(Math.random()*maxR).toCSG().
                    transformed(
                            Transform.unity().
                                    translate(
                                            Math.random()*w,
                                            Math.random()*h,
                                            Math.random()*d));
            if (spheres == null) {
                spheres = s;
            } else {
                spheres = spheres.union(s);
            }
        }

        return spheres;

}
