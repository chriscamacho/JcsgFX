
function main() {
	RoundedCube = Java.type("eu.mihosoft.vrl.v3d.RoundedCube")
        return new RoundedCube(30).resolution(8).cornerRadius(4).toCSG();
}

