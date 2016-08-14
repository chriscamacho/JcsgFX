// TODO check for unused
import javax.script.ScriptEngineManager;
import javax.script.ScriptEngine;
import javax.script.Invocable;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.charset.StandardCharsets;
import java.io.PrintStream;
import java.io.FileOutputStream;
import java.io.BufferedReader;
import java.io.File;

import eu.mihosoft.vrl.v3d.CSG;

import javafx.application.Application;
import javafx.stage.Stage;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.scene.*;
import javafx.scene.paint.*;
import javafx.scene.control.*;
import javafx.scene.shape.*;
import javafx.scene.transform.*;
import javafx.scene.text.*;
import javafx.beans.binding.Bindings;
import javafx.geometry.Insets;

import javafx.stage.FileChooser;
import javafx.stage.FileChooser.ExtensionFilter;

import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.scene.input.MouseEvent;

public class JcsgFX extends Application
{
    // TODO could probably OO some of this out of existence
    private Group mainGroup;
    private MeshView meshView = new MeshView();
    // TODO Doh apply rotation to object not camera (orbit less useful)
    private Rotate camRotX = new Rotate(0, Rotate.X_AXIS);
    private Rotate camRotY = new Rotate(0, Rotate.Y_AXIS);
    private TextArea textarea;
    private String script;
    private ScriptEngineManager manager = new ScriptEngineManager();
    private ScriptEngine engine = manager.getEngineByName("JavaScript");
    private Stage mainStage;
    private CSG result=null;
        
    public static void main(String[] args)
    {
        launch(args);
    }

    @Override
    public void start(Stage stage)
    {
        mainStage = stage;
        mainGroup = new Group();
        SubScene scene = new SubScene(mainGroup, 800, 600, true, null);
        VBox controls = createUI();

        scene.setFill(Color.rgb(20, 80, 40));
        PerspectiveCamera camera = new PerspectiveCamera();
        scene.setCamera(camera);

        //TODO add dolly, maybe pan?
        //TODO min clip plane for small models?
        camera.getTransforms().addAll(
            camRotY, camRotX, new Translate(-400, -300, 950));

        HBox layout = new HBox(
            controls,
            scene
        );
        stage.setTitle("Model Viewer");

        Scene sceneMain = new Scene(layout, Color.LIGHTBLUE);
        setMouseHandler(sceneMain);
        stage.setScene(sceneMain);
        stage.show();
    }

    private VBox createUI()
    {
        textarea = new TextArea();
        textarea.setText(script);
        textarea.setFont(Font.font("Verdana", FontWeight.NORMAL, 18));
        textarea.setPrefRowCount(20);

        Button updateButton = new Button("Update");
        updateButton.setOnAction(new EventHandler<ActionEvent>() { 
            public void handle(ActionEvent event) {
                updateCSG();
            }
        });

        Button loadButton = new Button("Load");
        loadButton.setOnAction(new EventHandler<ActionEvent>() { 
            public void handle(ActionEvent event) {
                script="";
                String line;
                FileChooser fileChooser = new FileChooser();
                fileChooser.setTitle("Open JavaScript");
                fileChooser.getExtensionFilters().addAll(
                     new ExtensionFilter("JavaScript Files", "*.js"),
                     new ExtensionFilter("All Files", "*.*"));
                File selectedFile = fileChooser.showOpenDialog(mainStage);
 
                try {
                    BufferedReader rd = Files.newBufferedReader(
                            Paths.get(selectedFile.getAbsolutePath()),
                            StandardCharsets.UTF_8);
                    while((line = rd.readLine()) != null) {
                        script = script + line +"\n";
                    }
                } catch (Exception e)
                {
                    //TODO
                }
                textarea.setText(script);
                updateCSG();
            }
        });

        Button saveButton = new Button("Save");
        saveButton.setOnAction(new EventHandler<ActionEvent>() { 
            public void handle(ActionEvent event) {
                FileChooser fileChooser = new FileChooser();
                fileChooser.setTitle("Save JavaScript");
                fileChooser.getExtensionFilters().addAll(
                     new ExtensionFilter("JavaScript Files", "*.js"),
                     new ExtensionFilter("All Files", "*.*"));
                File selectedFile = fileChooser.showSaveDialog(mainStage);
                try {
                    Files.write(Paths.get(selectedFile.getAbsolutePath()),
                            textarea.getText().getBytes());
                } catch (Exception e) {
                    // TODO much better feedback required here!
                }
            }
        });

        Button exportButton = new Button("Export");
        exportButton.setOnAction(new EventHandler<ActionEvent>() { 
            public void handle(ActionEvent event) {
                updateCSG();
                if (result!=null) {
                    String export = result.toStlString();
                                    FileChooser fileChooser = new FileChooser();
                    fileChooser.setTitle("Save STL file");
                    fileChooser.getExtensionFilters().addAll(
                        new ExtensionFilter("STereoLithography Files", "*.stl"),
                        new ExtensionFilter("All Files", "*.*"));
                    File selectedFile = fileChooser.showSaveDialog(mainStage);
                    try {
                        Files.write(Paths.get(selectedFile.getAbsolutePath()),
                                export.getBytes());
                    } catch (Exception e) {
                        // TODO much better feedback required here!
                    }                    
                }
            }
        });
        
        HBox controlLine = new HBox(10);
        controlLine.getChildren().addAll(loadButton,saveButton,exportButton,updateButton);

        VBox controls = new VBox(10, controlLine);
        controls.getChildren().add(textarea);
        controls.setPadding(new Insets(10));
        return controls;
    }

    private void updateCSG()
    {
        result = null;
        script = textarea.getText();
        try
        {
            engine.eval(script);
            Invocable inv = (Invocable) engine;
            result = (CSG)inv.invokeFunction("main");
        } catch (Exception e) {
            // TODO *much* better handling required here
            e.printStackTrace();
        }

        if (result!=null) {
            mainGroup.getChildren().remove(meshView);
            meshView = new MeshView(result.toJavaFXMeshSimple().getMeshes().get(0));
            mainGroup.getChildren().add(meshView);
        }
    }
    
    private double mousePosX, mousePosY = 0;

    private void setMouseHandler(Scene scene)
    {
        scene.setOnMousePressed((MouseEvent me) -> {
            mousePosX = me.getSceneX();
            mousePosY = me.getSceneY();
        });

        scene.setOnMouseDragged((MouseEvent me) -> {
            double dx = (mousePosX - me.getSceneX()) ;
            double dy = (mousePosY - me.getSceneY());

            camRotX.setAngle(camRotX.getAngle() + dy);
            camRotY.setAngle(camRotY.getAngle() + dx);

            mousePosX = me.getSceneX();
            mousePosY = me.getSceneY();
        });
    }
}
