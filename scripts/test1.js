// original Java code is left in comments so you can compare and
// contrast with the Javascript

jointLength = 10
jointRadius = 5
coneLength = 5
jointHoleLength = 5
jointConnectionThickness = jointRadius * 0.5
resolution = 16

function main() {

    Transform = Java.type("eu.mihosoft.vrl.v3d.Transform")
    Cylinder = Java.type("eu.mihosoft.vrl.v3d.Cylinder")
    Cube = Java.type("eu.mihosoft.vrl.v3d.Cube")

    //  CSG sideConeR = new Cylinder(getJointRadius(), 0, getConeLength(), getResolution()).toCSG().
    //          transformed(Transform.unity().translateZ(getJointLength() * 0.5));
    t = new Transform().translateZ(jointLength * 0.5)
    sideConeR = new Cylinder(jointRadius, 0 , coneLength, resolution).
                                    toCSG().transformed(t)

    // CSG sideConeL = new Cylinder(getJointRadius(), 0, getConeLength(), getResolution()).toCSG().
    //         transformed(Transform.unity().translateZ(-getJointLength() * 0.5).rotX(180));
    t = new Transform().translateZ(-jointLength * 0.5).rotX(180)
    sideConeL = new Cylinder(jointRadius, 0, coneLength, resolution).
                                    toCSG().transformed(t)

    // CSG sideCones = sideConeL.union(sideConeR);
    sideCones = sideConeL.union(sideConeR)

    // CSG conesAndCyl = sideCones.hull();
    conesAndCyl = sideCones.hull()

    // CSG cylinderHole = new Cube(getJointRadius() * 2, getJointHoleLength() * 2, getJointHoleLength()).toCSG().
    //         transformed(Transform.unity().translate(getJointConnectionThickness(), 0, -getJointHoleLength() * 0.0));
    t = new Transform().translate(jointConnectionThickness, 0, -jointHoleLength * 0.0) // * 0 ???
    cylinderHole = new Cube(jointRadius * 2, jointHoleLength * 2, jointHoleLength).
                                toCSG().transformed(t)

    //CSG joint = conesAndCyl.difference(cylinderHole);
    joint = conesAndCyl.difference(cylinderHole)

    java.lang.System.out.println("script finished")
    return joint
    
}
