
CSG = Java.type("eu.mihosoft.vrl.v3d.CSG")
Cylinder = Java.type("eu.mihosoft.vrl.v3d.Cylinder")
Plane = Java.type("eu.mihosoft.vrl.v3d.Plane")
RoundedCube = Java.type("eu.mihosoft.vrl.v3d.RoundedCube")
Transform = Java.type("eu.mihosoft.vrl.v3d.Transform")

function main() {

        w = 36;
        h = 36;
        wInner = 31;
        hInner = 31;

        r = 1.5;
        screwR = 1.25;
        screwHolderHeight = 4;

        thickness = 2.0;

        resolution = 16;

        base = basePlatform(r, thickness, resolution, w, h);
        
        screCylPrototype = new Cylinder(screwR,screwHolderHeight, resolution).toCSG().transformed(Transform.unity().translateZ(thickness));
        cyl1 = screCylPrototype.transformed(Transform.unity().translateX(-wInner / 2.0).translateY(-hInner / 2.0));
        cyl2 = screCylPrototype.transformed(Transform.unity().translateX(wInner / 2.0).translateY(-hInner / 2.0));
        cyl3 = screCylPrototype.transformed(Transform.unity().translateX(wInner / 2.0).translateY(hInner / 2.0));
        cyl4 = screCylPrototype.transformed(Transform.unity().translateX(-wInner / 2.0).translateY(hInner / 2.0));

        return base.union(cyl1,cyl2,cyl3,cyl4);
}

function basePlatform(r, thickness, resolution, w, h) {
        cylPrototype = new Cylinder(r, thickness, resolution).toCSG();
        cyl1 = cylPrototype.transformed(Transform.unity().translateX(-w / 2.0 + r).translateY(-h / 2.0+r));
        cyl2 = cylPrototype.transformed(Transform.unity().translateX(w / 2.0 -r).translateY(-h / 2.0+r));
        cyl3 = cylPrototype.transformed(Transform.unity().translateX(w / 2.0-r).translateY(h / 2.0-r));
        cyl4 = cylPrototype.transformed(Transform.unity().translateX(-w / 2.0+r).translateY(h / 2.0-r));
        base = cyl1.hull(cyl2, cyl3, cyl4);
        return base;
}



