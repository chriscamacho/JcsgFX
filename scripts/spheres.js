function main() {

	CSG = Java.type("eu.mihosoft.vrl.v3d.CSG")
	Sphere = Java.type("eu.mihosoft.vrl.v3d.Sphere")

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