
CSG = Java.type("eu.mihosoft.vrl.v3d.CSG")
Transform =  Java.type("eu.mihosoft.vrl.v3d.Transform")
Vector3d = Java.type("eu.mihosoft.vrl.v3d.Vector3d")
Extrude =  Java.type("eu.mihosoft.vrl.v3d.Extrude")


function main() {
    arduinoMountingThickness = 2.0;
    rspberryMountingThickness = 2.0;
    
    boardToBoardSpacing = 30.0;
    
    connectorDepth = 8;
    
    pegHeight= 1;
    pegToothHeight = 0.3;
    pegOverlap = 0.6;
    
   boardMountingWidth = 8;
    

        
    th = 2;
    smh = boardMountingWidth;
    ath = arduinoMountingThickness;
    rth = rspberryMountingThickness;
    b2bs = boardToBoardSpacing;
        
    pth = pegToothHeight;
    ph = pegHeight;
    po = pegOverlap;
        
    return Extrude.points(new Vector3d(0,0,connectorDepth),
                new Vector3d(-th,-th),
                new Vector3d(smh + pth+ph,-th),
                new Vector3d(smh + pth+Math.max(ph/3,0.4),0 + po),
                new Vector3d(smh + pth,0 + po),
                new Vector3d(smh,0),
                new Vector3d(0,0),
                new Vector3d(0,ath),
                new Vector3d(smh,ath),
                new Vector3d(smh,ath+th),
                new Vector3d(0,ath+th),
                new Vector3d(0,ath+th+b2bs),
                new Vector3d(smh,ath+th+b2bs),
                new Vector3d(smh,ath+th+b2bs+th),
                new Vector3d(0,ath+th+b2bs+th),
                new Vector3d(0,ath+th+b2bs+th+rth),
                new Vector3d(smh,ath+th+b2bs+th+rth),
                new Vector3d(smh + pth,ath+th+b2bs+th+rth - po),
                new Vector3d(smh + pth+Math.max(ph/3,0.4), ath + th + b2bs + th + rth - po),
                new Vector3d(smh + pth+ph,ath+th+b2bs+th+rth+th),
                new Vector3d(-th,ath+th+b2bs+th+rth+th)
        );
}
