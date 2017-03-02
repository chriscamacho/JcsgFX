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

// original Java code is left in comments so you can compare and
// contrast with the Javascript

jointLength = 10
jointRadius = 5
coneLength = 5
jointHoleLength = 5
jointConnectionThickness = jointRadius * 0.5
resolution = 16

function main() {

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
