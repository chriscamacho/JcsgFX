
import javax.script.*;

import java.nio.file.*;
import java.nio.charset.StandardCharsets;
import java.io.*;

import eu.mihosoft.jcsg.CSG;

import javafx.application.Application;
import javafx.stage.*;
import javafx.fxml.*;
import javafx.scene.*;
import javafx.scene.layout.*;
import javafx.scene.control.*;
import javafx.scene.shape.MeshView;
import javafx.scene.paint.Color;
import javafx.scene.transform.*;

//import javafx.scene.shape.Box;
//import javafx.scene.paint.PhongMaterial;
import javafx.scene.shape.TriangleMesh;

import javafx.scene.input.*;
import javafx.event.*;

import java.net.URL;

public class JcsgFX extends Application implements EventHandler<InputEvent>
{

    private ScriptEngineManager manager = new ScriptEngineManager();
    private ScriptEngine engine = manager.getEngineByName("JavaScript");
//	private CSG result=null;
	private MeshView meshView = new MeshView();
	private SubScene scene3d;
	public Stage mainStage;
	private Group scene3dGroup = new Group();
	private Rotate camRotX = new Rotate(0, Rotate.X_AXIS);
    private Rotate camRotY = new Rotate(0, Rotate.Y_AXIS);
    private Translate camTrans = new Translate(0,0,-500);
    private double camDistance=500;
    private double mousePosX, mousePosY = 0;

    private JcsgFXcontroller uiController;

	private String newScript = "CSG = Java.type(\"eu.mihosoft.jcsg.CSG\")\n"+
"Extrude = Java.type(\"eu.mihosoft.jcsg.Extrude\")\n"+
"\n"+
"Vector3d = Java.type(\"eu.mihosoft.vvecmath.Vector3d\")\n"+
"Transform = Java.type(\"eu.mihosoft.vvecmath.Transform\")\n"+
"Matrix3d = Java.type(\"eu.mihosoft.jcsg.Matrix3d\")\n"+
"\n"+
"Vertex = Java.type(\"eu.mihosoft.jcsg.Vertex\")\n"+
"Polygon = Java.type(\"eu.mihosoft.jcsg.Polygon\")\n"+
"\n"+
"Sphere = Java.type(\"eu.mihosoft.jcsg.Sphere\")\n"+
"Cube = Java.type(\"eu.mihosoft.jcsg.Cube\")\n"+
"Cylinder = Java.type(\"eu.mihosoft.jcsg.Cylinder\")\n"+
"RoundedCube = Java.type(\"eu.mihosoft.jcsg.RoundedCube\")\n"+
"\n"+
"\n"+
"function main() {\n"+
"	return new RoundedCube(10)\n"+
"			.cornerRadius(2)\n"+
"			.resolution(10)\n"+
"			.toCSG()\n"+
"}";

    public static void main(String[] args)
    {
        launch(args);
    }

    @Override
    public void start(Stage stage)
    {
		mainStage = stage;
		Parent root=null;
        FXMLLoader loader = new FXMLLoader();
		try {
			loader.setLocation(getClass().getResource("mainUI.fxml"));
			root = loader.load();
			uiController = loader.<JcsgFXcontroller>getController();
        } catch(Exception e) {
			e.printStackTrace();
		}
		if (root!=null) {
			uiController.setMain(this);

			stage.setTitle("JcsgFX");
			stage.setScene(new Scene(root));

			scene3dGroup = new Group();
			scene3d = new SubScene(scene3dGroup, 800, 600, true, null);
			scene3d.setFill(Color.rgb(20, 80, 40));
			PerspectiveCamera camera = new PerspectiveCamera(true);
			camera.setFarClip(3000);
			scene3d.setCamera(camera);
			camera.getTransforms().addAll(
					camRotY, camRotX, camTrans);
			uiController.getGraphicsArea().getChildren().add(scene3d);
			scene3d.heightProperty().bind(uiController.getGraphicsArea().heightProperty());
			scene3d.widthProperty().bind(uiController.getGraphicsArea().widthProperty());

			scene3d.setOnMousePressed(this);
			scene3d.setOnMouseDragged(this);
			scene3d.setOnScroll(this);

			System.out.println(scene3dGroup);

			newDoc();
/*
			TriangleMesh pyramidMesh = new TriangleMesh();
			float h = 1.5f;                    // Height
			float s = 3.0f;                    // Side
			pyramidMesh.getPoints().addAll(
					0,    0,    0,            // Point 0 - Top
					0,    h,    -s/2,         // Point 1 - Front
					-s/2, h,    0,            // Point 2 - Left
					s/2,  h,    0,            // Point 3 - Back
					0,    h,    s/2           // Point 4 - Right
				);

			pyramidMesh.getFaces().addAll(
				0,0,  2,0,  1,0,          // Front left face
				0,0,  1,0,  3,0,          // Front right face
				0,0,  3,0,  4,0,          // Back right face
				0,0,  4,0,  2,0,          // Back left face
				4,0,  1,0,  2,0,          // Bottom rear face
				4,0,  3,0,  1,0           // Bottom front face
			);
			pyramidMesh.getTexCoords().addAll(0,0);
			meshView = new MeshView(pyramidMesh);
			meshView.setTranslateX(0);
			meshView.setTranslateY(0);
			meshView.setTranslateZ(0);
*/
			scene3dGroup.getChildren().add(meshView);


			
			stage.show();
		} else {
			System.out.print("not able to load UI");
		}
    }

	void newDoc() {
		uiController.getCodeArea().setText(newScript);
	}

	void resetCamera() {
		camRotX.setAngle(0);
		camRotY.setAngle(0);
		camTrans.setZ(-500);
		camDistance=500;
	}

	CSG updateCSG()
    {
        CSG result = null;
		System.out.println(scene3dGroup);

        uiController.getMessageArea().setText("compile\n");
        String script = uiController.getCodeArea().getText();
        //System.out.println(script);
        try
        {
            engine.eval(script);
            Invocable inv = (Invocable)engine;
            result = (CSG)inv.invokeFunction("main");
        } catch (ScriptException e) {
            uiController.getMessageArea().appendText("Script error!\n");
            uiController.getMessageArea().appendText(e.getMessage()+"\n");
        } catch (Exception e) {
            uiController.getMessageArea().appendText("Error!\n");
            uiController.getMessageArea().appendText(e.getMessage()+"\n");
        }

        if (result!=null) {

            scene3dGroup.getChildren().remove(meshView);
            meshView = new MeshView(result.toJavaFXMeshSimple().getMeshes().get(0));
            scene3dGroup.getChildren().add(meshView);

            uiController.getMessageArea().appendText(((TriangleMesh)meshView.getMesh()).getFaces().size()+"\n");
        }
		uiController.getMessageArea().appendText("Done.\n");
//		messageArea.appendText(result.toStlString());
		return result; 
    }

    public void handle(InputEvent ie) {
		//System.out.println(ie);

		if (ie.getEventType() == MouseEvent.MOUSE_PRESSED) {
			mousePosX = ((MouseEvent)ie).getSceneX();
			mousePosY = ((MouseEvent)ie).getSceneY();
		}

		if (ie.getEventType() == MouseEvent.MOUSE_DRAGGED) {
			double dx = -(mousePosX - ((MouseEvent)ie).getSceneX()) ;
            double dy = (mousePosY - ((MouseEvent)ie).getSceneY());

            camRotX.setAngle(camRotX.getAngle() + dy);
            camRotY.setAngle(camRotY.getAngle() + dx);

            mousePosX = ((MouseEvent)ie).getSceneX();
            mousePosY = ((MouseEvent)ie).getSceneY();
		}
		
		if(ie.getEventType() == ScrollEvent.SCROLL) {
			//System.out.println( ((ScrollEvent)ie).getDeltaY() );
			camDistance+= (((ScrollEvent)ie).getDeltaY() / 10.0);
			if (camDistance<20) camDistance=20;
			if (camDistance>2500) camDistance=2500;
			camTrans.setZ(-camDistance);
		}
	}
}
