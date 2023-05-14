import React from "react";
import { Document, Page, Text, View } from "@react-pdf/renderer";

export default function PlanPdf({ plan }) {
  return (
    <Document>
      <Page size="A4" wrap style={{ fontSize: "10" }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <View
            style={{
              width: "40%",
              backgroundColor: "#007ce6",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: "15",
                fontWeight: "bold",
                margin: "auto",
                color: "#ffffff",
              }}
            >
              PLAN DE ENTRENAMIENTO
            </Text>
          </View>
          <View style={{ width: "60%", padding: 10 }}>
            <Text style={{ paddingBottom: "5", fontSize: "14" }}>
              Entrenador:{" "}
              <Text style={{ paddingBottom: "5", fontSize: "12" }}>
                Juan Urani
              </Text>
            </Text>
            <Text style={{ fontSize: "14" }}>
              Inicio del plan:{" "}
              <Text style={{ paddingBottom: "5", fontSize: "12" }}>
                22/01/23
              </Text>
            </Text>
          </View>
        </View>
        <View
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          {plan.days.map((day, index) => {
            return (
              <View
                key={index}
                style={{
                  width: plan.days.length === 7 ? "25%" : "33.33%",
                  textAlign: "center",
                  backgroundColor: index % 2 == 0 ? "#d5e5f3b3" : "#ffffff",
                  paddingBottom: "20",
                }}
              >
                <View
                  style={{
                    backgroundColor: "#007ce6",
                    color: "#ffffff",
                    fontSize: "12",
                    padding: "5",
                    paddingTop: "20",
                  }}
                >
                  <Text style={{ paddingBottom: "10" }}>{day.day.name}</Text>
                </View>
                <View>
                  {day.day.muscles.map((muscle, muscleIndex) => {
                    return (
                      <View style={{ paddingLeft: "10" }} key={muscleIndex}>
                        <Text
                          style={{
                            paddingTop: "15",
                            textAlign: "left",
                            paddingBottom: "5",
                            fontWeight: "800",
                            fontSize: "14",
                            textTransform: "capitalize",
                          }}
                        >
                          {muscle.name}
                        </Text>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                          }}
                        >
                          {muscle.exercises.map((exercise, exerciseIndex) => {
                            return (
                              <View
                                key={exerciseIndex}
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  flexWrap: "wrap",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: "10",
                                    textAlign: "left",
                                    paddingLeft: "10",
                                    width: "50%",
                                    paddingBottom: "5",
                                  }}
                                >
                                  {exercise.name}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: "10",
                                    textAlign: "left",
                                    paddingLeft: "10",
                                    width: "50%",
                                    paddingBottom: "5",
                                  }}
                                >
                                  {exercise.sets} x {exercise.reps} rep{" "}
                                  {exercise.isSuperSet ? "+" : null}
                                </Text>
                              </View>
                            );
                          })}
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            );
          })}
          {plan.days.length === 7 ? (
            <View
              style={{ width: "25%", marginBottom: "20", textAlign: "center" }}
            >
              <View
                style={{
                  backgroundColor: "#007ce6",
                  color: "#ffffff",
                  fontSize: "12",
                  padding: "5",
                  paddingTop: "20",
                }}
              >
                <Text style={{ paddingBottom: "10" }}>---</Text>
              </View>
              <View></View>
            </View>
          ) : null}
        </View>
      </Page>
    </Document>
  );
}
