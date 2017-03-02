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

function TransformFromA(a) {
  return Transform.unity()
         .translate(
		size*(Math.sin(a)+2*Math.sin(2*a)),
		size*(Math.cos(a)+2*Math.cos(2*a)),
		size*(-Math.sin(3*a)))
}

function main() {

  size = 80
  oldPos = TransformFromA(0)
  out = new Sphere(10, 8, 8).toCSG().transformed(oldPos)

  
  for (a=0;a<(Math.PI*2.0);a+=(Math.PI/6.0)) {
	print (a)
    newPos = TransformFromA(a)
    from = new Sphere(10, 8, 16).toCSG()
        .transformed(oldPos)
    to = new Sphere(10, 8, 16).toCSG()
        .transformed(newPos)
    link = from.hull(to)
    out = out.union(link)
    oldPos = newPos
  }

  last = new Sphere(10, 8, 16).toCSG().transformed(TransformFromA(0))
  end = new Sphere(10, 8, 16).toCSG().transformed(TransformFromA((Math.PI*2.0)-(Math.PI/6)))
  link = last.hull(end)
  out = out.union(link)

  base = new Cylinder(260,2.0,32).toCSG()
		.transformed(Transform.unity().translate(0,0,-90))
  out = out.union(base)



  return out
}
