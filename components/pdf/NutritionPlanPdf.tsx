import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

export default function NutritionPlanPdf({ plan }: any) {
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
              PLAN DE NUTRICIÓN
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
          {plan.days?.map((day: any, index: number) => {
            return (
              <View
                key={index}
                style={{
                  width: plan.days.length === 7 ? "25%" : "33.33%",
                  textAlign: "center",
                  backgroundColor: index % 2 == 0 ? "#d5e5f3b3" : "#ffffff",
                  paddingBottom: "10",
                  // height: "52%",
                }}
              >
                <View
                  style={{
                    backgroundColor: "#007ce6",
                    color: "#ffffff",
                    fontSize: "12",
                    padding: "5",
                    paddingTop: "10",
                  }}
                >
                  <Text style={{ paddingBottom: "10" }}>{day.name}</Text>
                </View>
                <View
                  style={{
                    padding: "5",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      display: "flex",
                      paddingBottom: "10",
                    }}
                  >
                    <View style={{ textAlign: "left" }}>
                      <Text style={{ paddingBottom: "5" }}>Desayuno</Text>
                    </View>
                    <View>
                      <Text style={{ fontSize: "9", textAlign: "left" }}>
                        {day.meals.breakfast
                          ? day.meals.breakfast
                          : "Sin comidas registradas"}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      display: "flex",
                      paddingBottom: "10",
                    }}
                  >
                    <View style={{ textAlign: "left" }}>
                      <Text style={{ paddingBottom: "5" }}>Almuerzo</Text>
                    </View>
                    <View>
                      <Text style={{ fontSize: "9", textAlign: "left" }}>
                        {day.meals.lunch
                          ? day.meals.lunch
                          : "Sin comidas registradas"}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      display: "flex",
                      paddingBottom: "10",
                    }}
                  >
                    <View style={{ textAlign: "left" }}>
                      <Text style={{ paddingBottom: "5" }}>Merienda</Text>
                    </View>
                    <View>
                      <Text style={{ fontSize: "9", textAlign: "left" }}>
                        {day.meals.afternoonSnack
                          ? day.meals.afternoonSnack
                          : "Sin comidas registradas"}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      width: "100%",
                      display: "flex",
                      paddingBottom: "10",
                    }}
                  >
                    <View style={{ textAlign: "left" }}>
                      <Text style={{ paddingBottom: "5" }}>Cena</Text>
                    </View>
                    <View>
                      <Text style={{ fontSize: "9", textAlign: "left" }}>
                        {day.meals.dinner
                          ? day.meals.dinner
                          : "Sin comidas registradas"}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      width: "100%",
                      display: "flex",
                      paddingBottom: "10",
                    }}
                  >
                    <View style={{ textAlign: "left" }}>
                      <Text style={{ paddingBottom: "5" }}>
                        Snacks {"(Agregados)"}
                      </Text>
                    </View>
                    <View>
                      <Text style={{ fontSize: "9", textAlign: "left" }}>
                        {day.meals.snacks
                          ? day.meals.snacks
                          : "Sin comidas registradas"}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
          {plan.days.length === 7 ? (
            <View
              style={{ width: "25%", marginBottom: "10", textAlign: "center" }}
            >
              <View
                style={{
                  backgroundColor: "#007ce6",
                  color: "#ffffff",
                  fontSize: "12",
                  padding: "5",
                  paddingTop: "10",
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
