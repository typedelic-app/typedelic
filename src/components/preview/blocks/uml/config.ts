export const config = {
  skin: `
    skinparam {
      monochrome reverse
      shadowing false
      backgroundColor transparent
      defaultBackgroundColor transparent
      stereotypeCBackgroundColor transparent
      stateBackgroundColor transparent
      defaultBackgroundColor transparent
      interfaceBackgroundColor transparent
      databaseBackgroundColor transparent
      folderBackgroundColor transparent
      fileBackgroundColor transparent
      nodeBackgroundColor transparent
      cloudBackgroundColor transparent
      agentBackgroundColor transparent
      packageBackgroundColor transparent
      frameBackgroundColor transparent
      stackBackgroundColor transparent
      storageBackgroundColor transparent
      squareBackgroundColor transparent
      cardBackgroundColor transparent
      collectionsBackgroundColor transparent
      queueBackgroundColor transparent
      artifactBackgroundColor transparent
      hexagonBackgroundColor transparent
      rectangleBackgroundColor transparent
      controlBackgroundColor transparent
      entityBackgroundColor transparent
      boundaryBackgroundColor transparent
      personBackgroundColor transparent
      machineBackgroundColor transparent
      legendBackgroundColor transparent
      lexicalBackgroundColor transparent
      noteBackgroundColor transparent
      boxBackgroundColor transparent
      componentBackgroundColor transparent
      rectangleBackgroundColor transparent
      sequenceBoxBackgroundColor transparent
      SequenceGroupBodyBackgroundColor transparent
      defaultFontName "Yu Gothic"
    }
    skinparam rectangle<<behavior>> {
      RoundCorner 25
      RectangleBackgroundColor white
    }
    skinparam legend {
      RectangleBackgroundColor transparent
      SequenceBoxBackgroundColor transparent
      SequenceGroupBodyBackgroundColor transparent
    }
    skinparam sequence {
      ParticipantBackgroundColor transparent
      ParticipantFontName "Yu Gothic"
      ParticipantFontSize 14
      ActorFontSize 14
      ActorFontName Nunito
      FontName Nunito
      ActorBackgroundColor transparent
      LifeLineBackgroundColor transparent
    }
    skinparam component {
      FontSize 13
      FontName "Yu Gothic"
      BorderColor black
      BackgroundColor transparent
      ArrowFontName "Yu Gothic"
      ArrowColor Gray
    }
    skinparam actor {
      FontName "Yu Gothic"
      BackgroundColor<< Human >> transparent
    }
    skinparam usecase {
      FontName "Yu Gothic"
      BackgroundColor transparent
      BorderColor #666
    }
    skinparam object {
      FontSize 13
      FontName "Yu Gothic"
      BackgroundColor transparent
    }
    skinparam class {
      FontName "Yu Gothic"
      BackgroundColor transparent
    }
    skinparam activity {
      FontName "Yu Gothic"
      BackgroundColor transparent
      DiamondBackgroundColor transparent
    }
    skinparam mindmap {
      nodeBackgroundColor transparent
      backgroundColor transparent
    }
  `,
  skin2: `
    <style>
      FontName "Yu Gothic"
      backgroundColor transparent
      node {
        BackGroundColor transparent
      }
      ganttDiagram {
        task {
            FontName "Yu Gothic"
            Padding 5
            BackGroundColor #ddd
        }
        milestone {
            FontSize 13
            FontStyle italic
            BackGroundColor #ddd
        }
      }
      saltDiagram {
        backgroundColor transparent
      }
    </style>
  `,
  hideSpots: `
    ' hide the spot
    hide circle
    ' avoid problems with angled crows feet
    skinparam linetype ortho
  `,
};
