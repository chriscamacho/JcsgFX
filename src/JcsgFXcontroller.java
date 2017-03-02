

import javafx.fxml.Initializable;
import java.net.URL;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.charset.StandardCharsets;
import java.io.BufferedReader;
import javafx.scene.control.*;
import javafx.scene.layout.*;
import java.util.ResourceBundle;
import javafx.fxml.*;
import javafx.scene.Parent;
import javafx.stage.FileChooser;
import javafx.stage.FileChooser.ExtensionFilter;
import eu.mihosoft.jcsg.CSG;

public class JcsgFXcontroller implements Initializable
{

    @FXML AnchorPane graphicsArea;
    @FXML TextArea codeArea;
    @FXML TextArea messageArea;

    JcsgFX mainInst;

    public AnchorPane getGraphicsArea() {return graphicsArea;}
    public TextArea getCodeArea() {return codeArea;}
    public TextArea getMessageArea() {return messageArea;}

    @Override // This method is called by the FXMLLoader when initialization is complete
    public void initialize(URL fxmlFileLocation, ResourceBundle resources) {
        assert graphicsArea != null : "fx:id=\"graphicsArea\" was not injected.";
        assert codeArea != null : "fx:id=\"codeArea\" was not injected.";
        assert messageArea != null : "fx:id=\"messageArea\" was not injected.";
		System.out.println("post ui injection"); 
	}

    public void setMain(JcsgFX i) { mainInst = i; } 

 	public void OnNew() {
		mainInst.newDoc();
	}

 	public void OnLoad() {
		String line,script="";
		FileChooser fileChooser = new FileChooser();
		fileChooser.setTitle("Open JavaScript");
		fileChooser.getExtensionFilters().addAll(
			 new ExtensionFilter("JavaScript Files", "*.js"),
			 new ExtensionFilter("All Files", "*.*"));
		File selectedFile = fileChooser.showOpenDialog(mainInst.mainStage);

		try {
			BufferedReader rd = Files.newBufferedReader(
					Paths.get(selectedFile.getAbsolutePath()),
					StandardCharsets.UTF_8);
			while((line = rd.readLine()) != null) {
				script = script + line +"\n";
			}
		} catch (Exception e)
		{
			e.printStackTrace();	// TODO
		}
		codeArea.setText(script);
		mainInst.updateCSG();
	}

 	public void OnSave() {
		FileChooser fileChooser = new FileChooser();
		fileChooser.setTitle("Save JavaScript");
		fileChooser.getExtensionFilters().addAll(
			 new ExtensionFilter("JavaScript Files", "*.js"),
			 new ExtensionFilter("All Files", "*.*"));
		File selectedFile = fileChooser.showSaveDialog(mainInst.mainStage);
		try {
			Files.write(Paths.get(selectedFile.getAbsolutePath()),
					codeArea.getText().getBytes());
		} catch (Exception e) {
			e.printStackTrace();	// TODO
		}
	}

	public void OnClose() {
		System.out.println("close");
	}

	public void OnCompile() {
		mainInst.updateCSG();
	}

	public void OnExport() {
                CSG result = mainInst.updateCSG();
                if (result!=null) {
                    String export = result.toStlString();
                                    FileChooser fileChooser = new FileChooser();
                    fileChooser.setTitle("Save STL file");
                    fileChooser.getExtensionFilters().addAll(
                        new ExtensionFilter("STereoLithography Files", "*.stl"),
                        new ExtensionFilter("All Files", "*.*"));
                    File selectedFile = fileChooser.showSaveDialog(mainInst.mainStage);
                    try {
                        Files.write(Paths.get(selectedFile.getAbsolutePath()),
                                export.getBytes());
                    } catch (Exception e) {
                        e.printStackTrace();// TODO much better feedback required here!
                    }                    
                }
	}
	
	public void OnResetCamera() {
		mainInst.resetCamera();
	}
}
