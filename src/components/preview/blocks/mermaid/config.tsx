import { mix } from 'polished';

export const getConfig = (color: any) => {
  const backgroundColor = color.background;
  const darkerBackgroundColor = color.editorbg;
  const primary = color.primary;
  const secondary = color.secondary;
  const tertiary = color.third;
  const textColor = color.text;
  const border = mix(0.7, color.primary)(color.background);
  return {
    theme: 'base',
    fontFamily: 'Nunito',
    fontSize: '13px',
    themeCSS: `
      background: ${darkerBackgroundColor}
      rect.er { fill: ${darkerBackgroundColor} !important; }
      rect.task { fill: ${primary}; stroke: ${backgroundColor}; stroke-width: 1;}
      text.taskText { stroke: ${backgroundColor} !important;fill: ${backgroundColor} !important; stroke-width: 0; }
      rect.fork-join { fill: ${primary} !important; stroke: ${primary} !important;  }
      rect.reqBox, rect.reqLabelBox { fill: ${darkerBackgroundColor} !important; }
      .journey-section .label, .task .label { color: ${darkerBackgroundColor}; }
      .pieTitleText { font-size: 20px; }
  `,
    themeVariables: {
      fontFamily: 'Nunito',
      fontSize: '13px',
      background: backgroundColor,
      primaryColor: primary,
      secondaryColor: secondary,
      tertiaryColor: tertiary,
      primaryTextColor: textColor,
      primaryBorderColor: border,
      secondaryTextColor: textColor,
      secondaryBorderColor: secondary,
      tertiaryTextColor: textColor,
      tertiaryBorderColor: darkerBackgroundColor,
      noteBkgColor: backgroundColor,
      noteTextColor: textColor,
      noteBorderColor: textColor,
      lineColor: textColor,
      textColor: textColor,
      mainBkg: darkerBackgroundColor,
      labelColor: primary,
      errorBkgColor: darkerBackgroundColor,
      errorTextColor: primary,
      clusterBkg: mix(0.1, color.primary)(color.background),
      titleColor: textColor,
      nodeTextColor: textColor,
      edgeLabelBackground: darkerBackgroundColor,
      activationBorderColor: textColor,
      activationBkgColor: mix(0.2, color.primary)(color.background),
      altBackground: darkerBackgroundColor,
    },
    startOnLoad: true,
    flowchart: {
      useMaxWidth: true,
      htmlLabels: true,
      curve: 'cardinal',
    },
    sequence: {
      diagramMarginX: 30,
      diagramMarginY: 5,
      actorMargin: 30,
      width: 90,
      height: 40,
      boxMargin: 5,
      boxTextMargin: 2,
      noteMargin: 5,
      messageMargin: 25,
      mirrorActors: true,
      bottomMarginAdj: 1,
      useMaxWidth: true,
      rightAngles: false,
      fontSize: '13px',
      fontFamily: 'Nunito',
    },
    state: {
      useWidth: 700,
    },
    gantt: {
      useWidth: 800,
      titleTopMargin: 25,
      barHeight: 20,
      barGap: 4,
      topPadding: 50,
      leftPadding: 75,
      gridLineStartPadding: 35,
      fontSize: 11,
      fontFamily: 'Nunito',
      numberSectionStyles: 4,
      axisFormat: '%Y-%m-%d',
    },
    pie: {
      useWidth: 800,
      fontSize: '12px',
    },
  };
};
