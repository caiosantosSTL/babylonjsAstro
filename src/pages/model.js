import * as BABYLON from "babylonjs";
import "babylonjs-loaders"



const canvas = document.getElementById("canvas"); 


const engine = new BABYLON.Engine(canvas, true); 

const createScene = async () => {
    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, false);

    camera.inputs.addMouseWheel()
    camera.lowerRadiusLimit = 15; 
    camera.upperRadiusLimit = 50; 

    await new BABYLON.PhotoDome(
        "testdome",
        "../texture/sky/cerulux1.png", {resolution: 32, size: 1000},
        scene
    )
    await BABYLON.SceneLoader.Append("public/models/", "montmap.glb", scene, function (meshes) {
        camera.target = meshes[0]
        console.log("mesh: ", meshes)
      });


    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0));

   
    

    return scene;
}




const scenex = await createScene(); 

engine.runRenderLoop(function () {
        scenex.render();
});

window.addEventListener("resize", function () {
        engine.resize();
});