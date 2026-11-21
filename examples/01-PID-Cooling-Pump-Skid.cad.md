---
cad-lab: true
---
# Cooling Water Skid — P&ID

Live vector schematic with unidirectional BOM synchronization.

<!-- cad-bom:start -->
## Bill of Materials (BOM)

> Auto-generated unidirectionally from the CAD schematic. Manual edits to this table do not modify the drawing.

| # | Tag | Component / Symbol | Brand | Model | Standard | Category | Value / Rating | Description | Attributes | Layer | Notes |
| :-: | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | E-101 | Heat exchanger | Alfa Laval | M10-BFG | ISO 10628 | Equipment | 120 kW | Plate Heat Exchanger | - | 0 | - |
| 2 | FIC-101 | Panel instrument | Siemens | PCS7-AI | ANSI/ISA-5.1 | Instruments and transmitters | 4-20 mA | DCS Flow Controller | - | SIGNALS | - |
| 3 | FV-101 | Control valve | Samson | 3241-7 | ANSI/ISA-5.1 | Valves and actuators | DN65 Cv40 | Pneumatic Flow Control Valve | - | 0 | - |
| 4 | HV-101 | Isolation valve | KSB | BOA-H | ISO 14617 | Valves and actuators | DN80 | Suction Gate Valve | - | 0 | - |
| 5 | HV-102 | Isolation valve | KSB | BOA-H | ISO 14617 | Valves and actuators | DN80 | Outlet Isolation Valve | - | 0 | - |
| 6 | NRV-101 | Check valve | ARI-Armaturen | Checko-V | ISO 14617 | Valves and actuators | DN80 | Swing Check Valve | - | 0 | - |
| 7 | P-101A | Centrifugal pump | Grundfos | CRN 32-4 | ISO 10628 | Equipment | 11 kW | Centrifugal Cooling Pump | - | 0 | - |
| 8 | PT-101 | Transmitter PT (Blank bubble) | Endress+Hauser | PMP51 | ANSI/ISA-5.1 | Instruments and transmitters | 0..16 bar | Discharge Pressure Transmitter | - | SIGNALS | - |
| 9 | TK-101 | Tank | AlfaTank | V25-SS316 | ISO 10628 | Equipment | 2500 L | Buffer Feed Tank | - | 0 | - |
| 10 | TT-101 | Transmitter TT (Blank bubble) | Endress+Hauser | TMT82 | ANSI/ISA-5.1 | Instruments and transmitters | -10..90 °C | Supply Temperature Transmitter | - | SIGNALS | - |
<!-- cad-bom:end -->

```cad-data
{
  "version": 1,
  "units": "mm",
  "layers": [
    {
      "id": "0",
      "name": "0",
      "visible": true,
      "locked": false,
      "color": 7,
      "lineType": "CONTINUOUS"
    },
    {
      "id": "PIPES",
      "name": "PIPES",
      "visible": true,
      "locked": false,
      "color": 4,
      "lineType": "CONTINUOUS"
    },
    {
      "id": "SIGNALS",
      "name": "SIGNALS",
      "visible": true,
      "locked": false,
      "color": 3,
      "lineType": "DASHED"
    }
  ],
  "blocks": [
    {
      "id": "pid-isolation",
      "name": "Isolation valve",
      "category": "P&ID / ISO 14617 / Valves and actuators",
      "entities": [
        {
          "id": "symbol-1",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -6,
              "y": -4
            },
            {
              "x": 6,
              "y": 4
            },
            {
              "x": 6,
              "y": -4
            },
            {
              "x": -6,
              "y": 4
            }
          ],
          "closed": true
        },
        {
          "id": "symbol-2",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -6,
            "y": 0
          }
        },
        {
          "id": "symbol-3",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 6,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "HV",
        "VALUE": "",
        "DESCRIPTION": ""
      },
      "library": "P&ID",
      "group": "Valves and actuators",
      "standard": "ISO 14617"
    },
    {
      "id": "pid-control",
      "name": "Control valve",
      "category": "P&ID / ANSI/ISA-5.1 / Valves and actuators",
      "entities": [
        {
          "id": "symbol-4",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -6,
              "y": -4
            },
            {
              "x": 6,
              "y": 4
            },
            {
              "x": 6,
              "y": -4
            },
            {
              "x": -6,
              "y": 4
            }
          ],
          "closed": true
        },
        {
          "id": "symbol-5",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -6,
            "y": 0
          }
        },
        {
          "id": "symbol-6",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 6,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        },
        {
          "id": "symbol-7",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 0
          },
          "b": {
            "x": 0,
            "y": 8
          }
        },
        {
          "id": "symbol-8",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -4,
              "y": 8
            },
            {
              "x": -4,
              "y": 10
            },
            {
              "x": 4,
              "y": 10
            },
            {
              "x": 4,
              "y": 8
            }
          ],
          "closed": true
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "FV",
        "VALUE": "",
        "DESCRIPTION": ""
      },
      "library": "P&ID",
      "group": "Valves and actuators",
      "standard": "ANSI/ISA-5.1"
    },
    {
      "id": "pid-check",
      "name": "Check valve",
      "category": "P&ID / ISO 14617 / Valves and actuators",
      "entities": [
        {
          "id": "symbol-9",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -5,
              "y": -4
            },
            {
              "x": 4,
              "y": 0
            },
            {
              "x": -5,
              "y": 4
            }
          ],
          "closed": true
        },
        {
          "id": "symbol-10",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 5,
            "y": -4
          },
          "b": {
            "x": 5,
            "y": 4
          }
        },
        {
          "id": "symbol-11",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -5,
            "y": 0
          }
        },
        {
          "id": "symbol-12",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 5,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "NRV",
        "VALUE": "",
        "DESCRIPTION": ""
      },
      "library": "P&ID",
      "group": "Valves and actuators",
      "standard": "ISO 14617"
    },
    {
      "id": "pid-safety",
      "name": "Safety valve",
      "category": "P&ID / ISO 14617 / Valves and actuators",
      "entities": [
        {
          "id": "symbol-13",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -6,
              "y": -4
            },
            {
              "x": 6,
              "y": 4
            },
            {
              "x": 6,
              "y": -4
            },
            {
              "x": -6,
              "y": 4
            }
          ],
          "closed": true
        },
        {
          "id": "symbol-14",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -6,
            "y": 0
          }
        },
        {
          "id": "symbol-15",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 6,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        },
        {
          "id": "symbol-16",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 0
          },
          "b": {
            "x": 0,
            "y": 5
          }
        },
        {
          "id": "symbol-17",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -3,
              "y": 5
            },
            {
              "x": 3,
              "y": 6
            },
            {
              "x": -3,
              "y": 7
            },
            {
              "x": 3,
              "y": 8
            },
            {
              "x": -3,
              "y": 9
            },
            {
              "x": 3,
              "y": 10
            }
          ],
          "closed": false
        },
        {
          "id": "symbol-18",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -4,
            "y": 11
          },
          "b": {
            "x": 4,
            "y": 11
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "PSV",
        "VALUE": "",
        "DESCRIPTION": ""
      },
      "library": "P&ID",
      "group": "Valves and actuators",
      "standard": "ISO 14617"
    },
    {
      "id": "pid-threeway",
      "name": "Three-way valve",
      "category": "P&ID / ISO 14617 / Valves and actuators",
      "entities": [
        {
          "id": "symbol-19",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -6,
              "y": -4
            },
            {
              "x": 6,
              "y": 4
            },
            {
              "x": 6,
              "y": -4
            },
            {
              "x": -6,
              "y": 4
            }
          ],
          "closed": true
        },
        {
          "id": "symbol-20",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -6,
            "y": 0
          }
        },
        {
          "id": "symbol-21",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 6,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        },
        {
          "id": "symbol-22",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -4,
              "y": -6
            },
            {
              "x": 0,
              "y": 0
            },
            {
              "x": 4,
              "y": -6
            }
          ],
          "closed": true
        },
        {
          "id": "symbol-23",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        },
        {
          "id": "BRANCH",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "XV",
        "VALUE": "",
        "DESCRIPTION": ""
      },
      "library": "P&ID",
      "group": "Valves and actuators",
      "standard": "ISO 14617"
    },
    {
      "id": "pid-pump",
      "name": "Centrifugal pump",
      "category": "P&ID / ISO 10628 / Equipment",
      "entities": [
        {
          "id": "symbol-24",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "symbol-25",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -3,
              "y": -4
            },
            {
              "x": 5,
              "y": 0
            },
            {
              "x": -3,
              "y": 4
            }
          ],
          "closed": true
        },
        {
          "id": "symbol-26",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -6,
            "y": 0
          }
        },
        {
          "id": "symbol-27",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 6,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        },
        {
          "id": "symbol-28",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -5,
            "y": -7
          },
          "b": {
            "x": 5,
            "y": -7
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "P",
        "VALUE": "",
        "DESCRIPTION": ""
      },
      "library": "P&ID",
      "group": "Equipment",
      "standard": "ISO 10628"
    },
    {
      "id": "pid-exchanger",
      "name": "Heat exchanger",
      "category": "P&ID / ISO 10628 / Equipment",
      "entities": [
        {
          "id": "symbol-29",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 7
        },
        {
          "id": "symbol-30",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -10,
              "y": 0
            },
            {
              "x": -5,
              "y": 0
            },
            {
              "x": -3,
              "y": 4
            },
            {
              "x": 0,
              "y": -4
            },
            {
              "x": 3,
              "y": 4
            },
            {
              "x": 5,
              "y": 0
            },
            {
              "x": 10,
              "y": 0
            }
          ],
          "closed": false
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "E",
        "VALUE": "",
        "DESCRIPTION": ""
      },
      "library": "P&ID",
      "group": "Equipment",
      "standard": "ISO 10628"
    },
    {
      "id": "pid-tank",
      "name": "Tank",
      "category": "P&ID / ISO 10628 / Equipment",
      "entities": [
        {
          "id": "symbol-31",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -7,
              "y": -8
            },
            {
              "x": -7,
              "y": 6
            },
            {
              "x": -4,
              "y": 9
            },
            {
              "x": 4,
              "y": 9
            },
            {
              "x": 7,
              "y": 6
            },
            {
              "x": 7,
              "y": -8
            }
          ],
          "closed": true
        },
        {
          "id": "symbol-32",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -7,
            "y": 0
          }
        },
        {
          "id": "symbol-33",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 7,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "V",
        "VALUE": "",
        "DESCRIPTION": ""
      },
      "library": "P&ID",
      "group": "Equipment",
      "standard": "ISO 10628"
    },
    {
      "id": "pid-field",
      "name": "Field instrument",
      "category": "P&ID / ANSI/ISA-5.1 / Instruments and transmitters",
      "entities": [
        {
          "id": "symbol-34",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "symbol-35",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "I",
        "VALUE": "",
        "DESCRIPTION": ""
      },
      "library": "P&ID",
      "group": "Instruments and transmitters",
      "standard": "ANSI/ISA-5.1"
    },
    {
      "id": "pid-panel",
      "name": "Panel instrument",
      "category": "P&ID / ANSI/ISA-5.1 / Instruments and transmitters",
      "entities": [
        {
          "id": "symbol-36",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "symbol-37",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -6,
            "y": 0
          },
          "b": {
            "x": 6,
            "y": 0
          }
        },
        {
          "id": "symbol-38",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "I",
        "VALUE": "",
        "DESCRIPTION": ""
      },
      "library": "P&ID",
      "group": "Instruments and transmitters",
      "standard": "ANSI/ISA-5.1"
    },
    {
      "id": "pid-PT",
      "name": "Transmitter PT (Blank bubble)",
      "category": "P&ID / ANSI/ISA-5.1 / Instruments and transmitters",
      "entities": [
        {
          "id": "symbol-39",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "symbol-40",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "PT",
        "VALUE": "",
        "DESCRIPTION": ""
      },
      "library": "P&ID",
      "group": "Instruments and transmitters",
      "standard": "ANSI/ISA-5.1"
    },
    {
      "id": "pid-TT",
      "name": "Transmitter TT (Blank bubble)",
      "category": "P&ID / ANSI/ISA-5.1 / Instruments and transmitters",
      "entities": [
        {
          "id": "symbol-41",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "symbol-42",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "TT",
        "VALUE": "",
        "DESCRIPTION": ""
      },
      "library": "P&ID",
      "group": "Instruments and transmitters",
      "standard": "ANSI/ISA-5.1"
    },
    {
      "id": "pid-FT",
      "name": "Transmitter FT (Blank bubble)",
      "category": "P&ID / ANSI/ISA-5.1 / Instruments and transmitters",
      "entities": [
        {
          "id": "symbol-43",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "symbol-44",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "FT",
        "VALUE": "",
        "DESCRIPTION": ""
      },
      "library": "P&ID",
      "group": "Instruments and transmitters",
      "standard": "ANSI/ISA-5.1"
    },
    {
      "id": "pid-LT",
      "name": "Transmitter LT (Blank bubble)",
      "category": "P&ID / ANSI/ISA-5.1 / Instruments and transmitters",
      "entities": [
        {
          "id": "symbol-45",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "symbol-46",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "LT",
        "VALUE": "",
        "DESCRIPTION": ""
      },
      "library": "P&ID",
      "group": "Instruments and transmitters",
      "standard": "ANSI/ISA-5.1"
    },
    {
      "id": "iec-breaker-1",
      "name": "Circuit breaker 1P",
      "category": "Electrical multi-line / IEC 60617 / Switching and protection",
      "entities": [
        {
          "id": "symbol-47",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 4
          }
        },
        {
          "id": "symbol-48",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -4
          },
          "b": {
            "x": 0,
            "y": -10
          }
        },
        {
          "id": "symbol-49",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -4
          },
          "b": {
            "x": 4,
            "y": 4
          }
        },
        {
          "id": "symbol-50",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -2,
              "y": 4
            },
            {
              "x": 2,
              "y": 4
            },
            {
              "x": 2,
              "y": 6
            },
            {
              "x": -2,
              "y": 6
            }
          ],
          "closed": true
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "Q",
        "VALUE": "",
        "DESCRIPTION": ""
      },
      "library": "Electrical multi-line",
      "group": "Switching and protection",
      "standard": "IEC 60617"
    },
    {
      "id": "iec-breaker-3",
      "name": "Circuit breaker 3P",
      "category": "Electrical multi-line / IEC 60617 / Switching and protection",
      "entities": [
        {
          "id": "symbol-51",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -6,
            "y": 10
          },
          "b": {
            "x": -6,
            "y": 4
          }
        },
        {
          "id": "symbol-52",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -6,
            "y": -4
          },
          "b": {
            "x": -6,
            "y": -10
          }
        },
        {
          "id": "symbol-53",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -6,
            "y": -4
          },
          "b": {
            "x": -2,
            "y": 4
          }
        },
        {
          "id": "symbol-54",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -8,
              "y": 4
            },
            {
              "x": -4,
              "y": 4
            },
            {
              "x": -4,
              "y": 6
            },
            {
              "x": -8,
              "y": 6
            }
          ],
          "closed": true
        },
        {
          "id": "symbol-55",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 4
          }
        },
        {
          "id": "symbol-56",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -4
          },
          "b": {
            "x": 0,
            "y": -10
          }
        },
        {
          "id": "symbol-57",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -4
          },
          "b": {
            "x": 4,
            "y": 4
          }
        },
        {
          "id": "symbol-58",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -2,
              "y": 4
            },
            {
              "x": 2,
              "y": 4
            },
            {
              "x": 2,
              "y": 6
            },
            {
              "x": -2,
              "y": 6
            }
          ],
          "closed": true
        },
        {
          "id": "symbol-59",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 6,
            "y": 10
          },
          "b": {
            "x": 6,
            "y": 4
          }
        },
        {
          "id": "symbol-60",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 6,
            "y": -4
          },
          "b": {
            "x": 6,
            "y": -10
          }
        },
        {
          "id": "symbol-61",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 6,
            "y": -4
          },
          "b": {
            "x": 10,
            "y": 4
          }
        },
        {
          "id": "symbol-62",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": 4,
              "y": 4
            },
            {
              "x": 8,
              "y": 4
            },
            {
              "x": 8,
              "y": 6
            },
            {
              "x": 4,
              "y": 6
            }
          ],
          "closed": true
        },
        {
          "id": "symbol-63",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -8,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          },
          "lineType": "DASHED"
        }
      ],
      "ports": [
        {
          "id": "L1",
          "point": {
            "x": -6,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "T1",
          "point": {
            "x": -6,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "L2",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "T2",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "L3",
          "point": {
            "x": 6,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "T3",
          "point": {
            "x": 6,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "Q",
        "VALUE": "",
        "DESCRIPTION": ""
      },
      "library": "Electrical multi-line",
      "group": "Switching and protection",
      "standard": "IEC 60617"
    },
    {
      "id": "iec-rcd",
      "name": "Residual-current device",
      "category": "Electrical multi-line / IEC 60617 / Switching and protection",
      "entities": [
        {
          "id": "symbol-64",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 4
          }
        },
        {
          "id": "symbol-65",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -4
          },
          "b": {
            "x": 0,
            "y": -10
          }
        },
        {
          "id": "symbol-66",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -4
          },
          "b": {
            "x": 4,
            "y": 4
          }
        },
        {
          "id": "symbol-67",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -2,
              "y": 4
            },
            {
              "x": 2,
              "y": 4
            },
            {
              "x": 2,
              "y": 6
            },
            {
              "x": -2,
              "y": 6
            }
          ],
          "closed": true
        },
        {
          "id": "symbol-68",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 7
          },
          "radius": 2
        },
        {
          "id": "symbol-69",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -7,
            "y": -1
          },
          "text": "ΔI",
          "height": 2.5,
          "rotation": 0
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "Q",
        "VALUE": "",
        "DESCRIPTION": ""
      },
      "library": "Electrical multi-line",
      "group": "Switching and protection",
      "standard": "IEC 60617"
    },
    {
      "id": "iec-disconnector",
      "name": "Disconnector",
      "category": "Electrical multi-line / IEC 60617 / Switching and protection",
      "entities": [
        {
          "id": "symbol-70",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 4
          }
        },
        {
          "id": "symbol-71",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -10
          },
          "b": {
            "x": 0,
            "y": -4
          }
        },
        {
          "id": "symbol-72",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -4
          },
          "b": {
            "x": 4,
            "y": 4
          }
        },
        {
          "id": "symbol-73",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 4
          },
          "radius": 0.6
        },
        {
          "id": "symbol-74",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": -4
          },
          "radius": 0.6
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "QS",
        "VALUE": "",
        "DESCRIPTION": ""
      },
      "library": "Electrical multi-line",
      "group": "Switching and protection",
      "standard": "IEC 60617"
    },
    {
      "id": "iec-coil",
      "name": "Contactor coil",
      "category": "Electrical multi-line / IEC 60617 / Control and automation",
      "entities": [
        {
          "id": "symbol-75",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -5,
              "y": -4
            },
            {
              "x": 5,
              "y": -4
            },
            {
              "x": 5,
              "y": 4
            },
            {
              "x": -5,
              "y": 4
            }
          ],
          "closed": true
        },
        {
          "id": "symbol-76",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 4
          },
          "b": {
            "x": 0,
            "y": 10
          }
        },
        {
          "id": "symbol-77",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -4
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "K",
        "VALUE": "",
        "DESCRIPTION": ""
      },
      "library": "Electrical multi-line",
      "group": "Control and automation",
      "standard": "IEC 60617"
    },
    {
      "id": "iec-contact-no",
      "name": "Normally open contact",
      "category": "Electrical multi-line / IEC 60617 / Control and automation",
      "entities": [
        {
          "id": "symbol-78",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 2
          }
        },
        {
          "id": "symbol-79",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -4,
            "y": 2
          },
          "b": {
            "x": 4,
            "y": 2
          }
        },
        {
          "id": "symbol-80",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -4,
            "y": -2
          },
          "b": {
            "x": 4,
            "y": -2
          }
        },
        {
          "id": "symbol-81",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -2
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "K",
        "VALUE": "",
        "DESCRIPTION": ""
      },
      "library": "Electrical multi-line",
      "group": "Control and automation",
      "standard": "IEC 60617"
    },
    {
      "id": "iec-contact-nc",
      "name": "Normally closed contact",
      "category": "Electrical multi-line / IEC 60617 / Control and automation",
      "entities": [
        {
          "id": "symbol-82",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 2
          }
        },
        {
          "id": "symbol-83",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -4,
            "y": 2
          },
          "b": {
            "x": 4,
            "y": 2
          }
        },
        {
          "id": "symbol-84",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -4,
            "y": -2
          },
          "b": {
            "x": 4,
            "y": -2
          }
        },
        {
          "id": "symbol-85",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -2
          },
          "b": {
            "x": 0,
            "y": -10
          }
        },
        {
          "id": "symbol-86",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -4,
            "y": -4
          },
          "b": {
            "x": 4,
            "y": 4
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "K",
        "VALUE": "",
        "DESCRIPTION": ""
      },
      "library": "Electrical multi-line",
      "group": "Control and automation",
      "standard": "IEC 60617"
    },
    {
      "id": "iec-thermal",
      "name": "Thermal overload relay",
      "category": "Electrical multi-line / IEC 60617 / Switching and protection",
      "entities": [
        {
          "id": "symbol-87",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 4
          }
        },
        {
          "id": "symbol-88",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": 0,
              "y": 4
            },
            {
              "x": 3,
              "y": 4
            },
            {
              "x": 3,
              "y": -4
            },
            {
              "x": 0,
              "y": -4
            },
            {
              "x": 0,
              "y": -10
            }
          ],
          "closed": false
        },
        {
          "id": "symbol-89",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -4,
              "y": 5
            },
            {
              "x": 5,
              "y": 5
            },
            {
              "x": 5,
              "y": -5
            },
            {
              "x": -4,
              "y": -5
            }
          ],
          "closed": true
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "F",
        "VALUE": "",
        "DESCRIPTION": ""
      },
      "library": "Electrical multi-line",
      "group": "Switching and protection",
      "standard": "IEC 60617"
    },
    {
      "id": "iec-motor",
      "name": "Three-phase motor",
      "category": "Electrical multi-line / IEC 60617 / Machines and connections",
      "entities": [
        {
          "id": "symbol-90",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 7
        },
        {
          "id": "symbol-91",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -2,
            "y": 0
          },
          "text": "M",
          "height": 4,
          "rotation": 0
        },
        {
          "id": "symbol-92",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -2,
            "y": -4
          },
          "text": "3~",
          "height": 2.5,
          "rotation": 0
        },
        {
          "id": "symbol-93",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 7
          },
          "b": {
            "x": 0,
            "y": 10
          }
        }
      ],
      "ports": [
        {
          "id": "U",
          "point": {
            "x": -3,
            "y": 6.32
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "V",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "W",
          "point": {
            "x": 3,
            "y": 6.32
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "M",
        "VALUE": "",
        "DESCRIPTION": ""
      },
      "library": "Electrical multi-line",
      "group": "Machines and connections",
      "standard": "IEC 60617"
    },
    {
      "id": "iec-transformer",
      "name": "Transformer",
      "category": "Electrical multi-line / IEC 60617 / Machines and connections",
      "entities": [
        {
          "id": "symbol-94",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 3
          },
          "radius": 4
        },
        {
          "id": "symbol-95",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": -3
          },
          "radius": 4
        },
        {
          "id": "symbol-96",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 7
          },
          "b": {
            "x": 0,
            "y": 10
          }
        },
        {
          "id": "symbol-97",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -7
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "T",
        "VALUE": "",
        "DESCRIPTION": ""
      },
      "library": "Electrical multi-line",
      "group": "Machines and connections",
      "standard": "IEC 60617"
    },
    {
      "id": "iec-terminal",
      "name": "Terminal",
      "category": "Electrical multi-line / IEC 60617 / Machines and connections",
      "entities": [
        {
          "id": "symbol-98",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 2
        },
        {
          "id": "symbol-99",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -2,
            "y": 0
          }
        },
        {
          "id": "symbol-100",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 2,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "X",
        "VALUE": "",
        "DESCRIPTION": ""
      },
      "library": "Electrical multi-line",
      "group": "Machines and connections",
      "standard": "IEC 60617"
    },
    {
      "id": "iec-earth",
      "name": "Protective earth",
      "category": "Electrical multi-line / IEC 60617 / Machines and connections",
      "entities": [
        {
          "id": "symbol-101",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 0
          }
        },
        {
          "id": "symbol-102",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -5,
            "y": 0
          },
          "b": {
            "x": 5,
            "y": 0
          }
        },
        {
          "id": "symbol-103",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -3,
            "y": -2
          },
          "b": {
            "x": 3,
            "y": -2
          }
        },
        {
          "id": "symbol-104",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -1,
            "y": -4
          },
          "b": {
            "x": 1,
            "y": -4
          }
        }
      ],
      "ports": [
        {
          "id": "PE",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "PE",
        "VALUE": "",
        "DESCRIPTION": ""
      },
      "library": "Electrical multi-line",
      "group": "Machines and connections",
      "standard": "IEC 60617"
    },
    {
      "id": "pid-gate",
      "name": "Gate valve",
      "library": "P&ID",
      "group": "Valves and actuators",
      "standard": "ISO 14617",
      "category": "P&ID / ISO 14617 / Valves and actuators",
      "entities": [
        {
          "id": "catalog-1",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -6,
              "y": -4
            },
            {
              "x": 6,
              "y": 4
            },
            {
              "x": 6,
              "y": -4
            },
            {
              "x": -6,
              "y": 4
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-2",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -6,
            "y": 0
          }
        },
        {
          "id": "catalog-3",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 6,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "XV",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "pid-ball",
      "name": "Ball valve",
      "library": "P&ID",
      "group": "Valves and actuators",
      "standard": "ISO 14617",
      "category": "P&ID / ISO 14617 / Valves and actuators",
      "entities": [
        {
          "id": "catalog-4",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -6,
              "y": -4
            },
            {
              "x": 6,
              "y": 4
            },
            {
              "x": 6,
              "y": -4
            },
            {
              "x": -6,
              "y": 4
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-5",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -6,
            "y": 0
          }
        },
        {
          "id": "catalog-6",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 6,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        },
        {
          "id": "catalog-7",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 2.5
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "XV",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "pid-butterfly",
      "name": "Butterfly valve",
      "library": "P&ID",
      "group": "Valves and actuators",
      "standard": "ISO 14617",
      "category": "P&ID / ISO 14617 / Valves and actuators",
      "entities": [
        {
          "id": "catalog-8",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 5
        },
        {
          "id": "catalog-9",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -4,
            "y": -4
          },
          "b": {
            "x": 4,
            "y": 4
          }
        },
        {
          "id": "catalog-10",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -5,
            "y": 0
          }
        },
        {
          "id": "catalog-11",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 5,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "XV",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "pid-globe",
      "name": "Globe valve",
      "library": "P&ID",
      "group": "Valves and actuators",
      "standard": "ISO 14617",
      "category": "P&ID / ISO 14617 / Valves and actuators",
      "entities": [
        {
          "id": "catalog-12",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -6,
              "y": -4
            },
            {
              "x": 6,
              "y": 4
            },
            {
              "x": 6,
              "y": -4
            },
            {
              "x": -6,
              "y": 4
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-13",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -6,
            "y": 0
          }
        },
        {
          "id": "catalog-14",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 6,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        },
        {
          "id": "catalog-15",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 1
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "XV",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "pid-needle",
      "name": "Needle valve",
      "library": "P&ID",
      "group": "Valves and actuators",
      "standard": "ISO 14617",
      "category": "P&ID / ISO 14617 / Valves and actuators",
      "entities": [
        {
          "id": "catalog-16",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -6,
              "y": -4
            },
            {
              "x": 6,
              "y": 4
            },
            {
              "x": 6,
              "y": -4
            },
            {
              "x": -6,
              "y": 4
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-17",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -6,
            "y": 0
          }
        },
        {
          "id": "catalog-18",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 6,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        },
        {
          "id": "catalog-19",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 0
          },
          "b": {
            "x": 0,
            "y": 9
          }
        },
        {
          "id": "catalog-20",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -2,
              "y": 5
            },
            {
              "x": 0,
              "y": 0
            },
            {
              "x": 2,
              "y": 5
            }
          ],
          "closed": true
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "XV",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "pid-diaphragm",
      "name": "Diaphragm valve",
      "library": "P&ID",
      "group": "Valves and actuators",
      "standard": "ISO 14617",
      "category": "P&ID / ISO 14617 / Valves and actuators",
      "entities": [
        {
          "id": "catalog-21",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -6,
              "y": -4
            },
            {
              "x": 6,
              "y": 4
            },
            {
              "x": 6,
              "y": -4
            },
            {
              "x": -6,
              "y": 4
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-22",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -6,
            "y": 0
          }
        },
        {
          "id": "catalog-23",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 6,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        },
        {
          "id": "catalog-24",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -5,
              "y": 5
            },
            {
              "x": 0,
              "y": 7
            },
            {
              "x": 5,
              "y": 5
            }
          ],
          "closed": false
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "XV",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "pid-plug",
      "name": "Plug valve (ISO 14617)",
      "library": "P&ID",
      "group": "Valves and actuators",
      "standard": "ISO 14617",
      "category": "P&ID / ISO 14617 / Valves and actuators",
      "entities": [
        {
          "id": "catalog-25",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -6,
              "y": -4
            },
            {
              "x": 6,
              "y": 4
            },
            {
              "x": 6,
              "y": -4
            },
            {
              "x": -6,
              "y": 4
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-26",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -6,
            "y": 0
          }
        },
        {
          "id": "catalog-27",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 6,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        },
        {
          "id": "catalog-28",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -2,
              "y": -2
            },
            {
              "x": 0,
              "y": 2
            },
            {
              "x": 2,
              "y": -2
            },
            {
              "x": 0,
              "y": -2
            }
          ],
          "closed": true
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "XV",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "pid-pinch",
      "name": "Pinch valve (ISO 14617)",
      "library": "P&ID",
      "group": "Valves and actuators",
      "standard": "ISO 14617",
      "category": "P&ID / ISO 14617 / Valves and actuators",
      "entities": [
        {
          "id": "catalog-29",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -6,
              "y": -4
            },
            {
              "x": 6,
              "y": 4
            },
            {
              "x": 6,
              "y": -4
            },
            {
              "x": -6,
              "y": 4
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-30",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -6,
            "y": 0
          }
        },
        {
          "id": "catalog-31",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 6,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        },
        {
          "id": "catalog-32",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -3,
            "y": 5
          },
          "b": {
            "x": 3,
            "y": 5
          }
        },
        {
          "id": "catalog-33",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -3,
            "y": -5
          },
          "b": {
            "x": 3,
            "y": -5
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "XV",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "pid-solenoid",
      "name": "Solenoid valve",
      "library": "P&ID",
      "group": "Valves and actuators",
      "standard": "ANSI/ISA-5.1",
      "category": "P&ID / ANSI/ISA-5.1 / Valves and actuators",
      "entities": [
        {
          "id": "catalog-34",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -6,
              "y": -4
            },
            {
              "x": 6,
              "y": 4
            },
            {
              "x": 6,
              "y": -4
            },
            {
              "x": -6,
              "y": 4
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-35",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -6,
            "y": 0
          }
        },
        {
          "id": "catalog-36",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 6,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        },
        {
          "id": "catalog-37",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 0
          },
          "b": {
            "x": 0,
            "y": 8
          }
        },
        {
          "id": "catalog-38",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -3,
              "y": 8
            },
            {
              "x": 3,
              "y": 8
            },
            {
              "x": 3,
              "y": 12
            },
            {
              "x": -3,
              "y": 12
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-39",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -1,
            "y": 9
          },
          "text": "S",
          "height": 2,
          "rotation": 0
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "XV",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "pid-pneumatic",
      "name": "Pneumatically actuated valve",
      "library": "P&ID",
      "group": "Valves and actuators",
      "standard": "ANSI/ISA-5.1",
      "category": "P&ID / ANSI/ISA-5.1 / Valves and actuators",
      "entities": [
        {
          "id": "catalog-40",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -6,
              "y": -4
            },
            {
              "x": 6,
              "y": 4
            },
            {
              "x": 6,
              "y": -4
            },
            {
              "x": -6,
              "y": 4
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-41",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -6,
            "y": 0
          }
        },
        {
          "id": "catalog-42",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 6,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        },
        {
          "id": "catalog-43",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 0
          },
          "b": {
            "x": 0,
            "y": 8
          }
        },
        {
          "id": "catalog-44",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -5,
              "y": 8
            },
            {
              "x": -3,
              "y": 11
            },
            {
              "x": 0,
              "y": 12
            },
            {
              "x": 3,
              "y": 11
            },
            {
              "x": 5,
              "y": 8
            }
          ],
          "closed": true
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "XV",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "pid-motorized",
      "name": "Motor-operated valve",
      "library": "P&ID",
      "group": "Valves and actuators",
      "standard": "ANSI/ISA-5.1",
      "category": "P&ID / ANSI/ISA-5.1 / Valves and actuators",
      "entities": [
        {
          "id": "catalog-45",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -6,
              "y": -4
            },
            {
              "x": 6,
              "y": 4
            },
            {
              "x": 6,
              "y": -4
            },
            {
              "x": -6,
              "y": 4
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-46",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -6,
            "y": 0
          }
        },
        {
          "id": "catalog-47",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 6,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        },
        {
          "id": "catalog-48",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 0
          },
          "b": {
            "x": 0,
            "y": 7
          }
        },
        {
          "id": "catalog-49",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 10
          },
          "radius": 3
        },
        {
          "id": "catalog-50",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -1,
            "y": 9
          },
          "text": "M",
          "height": 2,
          "rotation": 0
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "XV",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "pid-piston-valve",
      "name": "Hydraulic / piston actuated valve (ISA-5.1)",
      "library": "P&ID",
      "group": "Valves and actuators",
      "standard": "ANSI/ISA-5.1",
      "category": "P&ID / ANSI/ISA-5.1 / Valves and actuators",
      "entities": [
        {
          "id": "catalog-51",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -6,
              "y": -4
            },
            {
              "x": 6,
              "y": 4
            },
            {
              "x": 6,
              "y": -4
            },
            {
              "x": -6,
              "y": 4
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-52",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -6,
            "y": 0
          }
        },
        {
          "id": "catalog-53",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 6,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        },
        {
          "id": "catalog-54",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 0
          },
          "b": {
            "x": 0,
            "y": 7
          }
        },
        {
          "id": "catalog-55",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -4,
              "y": 7
            },
            {
              "x": 4,
              "y": 7
            },
            {
              "x": 4,
              "y": 13
            },
            {
              "x": -4,
              "y": 13
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-56",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -4,
            "y": 10
          },
          "b": {
            "x": 4,
            "y": 10
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "XV",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "pid-angle",
      "name": "Angle valve",
      "library": "P&ID",
      "group": "Valves and actuators",
      "standard": "ISO 14617",
      "category": "P&ID / ISO 14617 / Valves and actuators",
      "entities": [
        {
          "id": "catalog-57",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -6,
              "y": 4
            },
            {
              "x": -6,
              "y": -4
            },
            {
              "x": 0,
              "y": 0
            },
            {
              "x": 4,
              "y": -6
            },
            {
              "x": -4,
              "y": -6
            },
            {
              "x": 0,
              "y": 0
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-58",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -6,
            "y": 0
          }
        },
        {
          "id": "catalog-59",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "XV",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "pid-fourway",
      "name": "Four-way valve (ISO 14617)",
      "library": "P&ID",
      "group": "Valves and actuators",
      "standard": "ISO 14617",
      "category": "P&ID / ISO 14617 / Valves and actuators",
      "entities": [
        {
          "id": "catalog-60",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -6,
              "y": -4
            },
            {
              "x": 6,
              "y": 4
            },
            {
              "x": 6,
              "y": -4
            },
            {
              "x": -6,
              "y": 4
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-61",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -6,
            "y": 0
          }
        },
        {
          "id": "catalog-62",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 6,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        },
        {
          "id": "catalog-63",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -4,
              "y": -6
            },
            {
              "x": 0,
              "y": 0
            },
            {
              "x": 4,
              "y": -6
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-64",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -4,
              "y": 6
            },
            {
              "x": 0,
              "y": 0
            },
            {
              "x": 4,
              "y": 6
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-65",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        },
        {
          "id": "catalog-66",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 6
          },
          "b": {
            "x": 0,
            "y": 10
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        },
        {
          "id": "TOP",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "BOTTOM",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "XV",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "isa-PI-field",
      "name": "Pressure indicator · field",
      "library": "P&ID",
      "group": "Field instruments",
      "standard": "ANSI/ISA-5.1",
      "category": "P&ID / ANSI/ISA-5.1 / Field instruments",
      "entities": [
        {
          "id": "catalog-67",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-68",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "PI",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "isa-PI-panel",
      "name": "Pressure indicator · panel",
      "library": "P&ID",
      "group": "Panel instruments",
      "standard": "ANSI/ISA-5.1",
      "category": "P&ID / ANSI/ISA-5.1 / Panel instruments",
      "entities": [
        {
          "id": "catalog-69",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-70",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -6,
            "y": 0
          },
          "b": {
            "x": 6,
            "y": 0
          }
        },
        {
          "id": "catalog-71",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "PI",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "isa-TI-field",
      "name": "Temperature indicator · field",
      "library": "P&ID",
      "group": "Field instruments",
      "standard": "ANSI/ISA-5.1",
      "category": "P&ID / ANSI/ISA-5.1 / Field instruments",
      "entities": [
        {
          "id": "catalog-72",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-73",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "TI",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "isa-TI-panel",
      "name": "Temperature indicator · panel",
      "library": "P&ID",
      "group": "Panel instruments",
      "standard": "ANSI/ISA-5.1",
      "category": "P&ID / ANSI/ISA-5.1 / Panel instruments",
      "entities": [
        {
          "id": "catalog-74",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-75",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -6,
            "y": 0
          },
          "b": {
            "x": 6,
            "y": 0
          }
        },
        {
          "id": "catalog-76",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "TI",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "isa-FI-field",
      "name": "Flow indicator · field",
      "library": "P&ID",
      "group": "Field instruments",
      "standard": "ANSI/ISA-5.1",
      "category": "P&ID / ANSI/ISA-5.1 / Field instruments",
      "entities": [
        {
          "id": "catalog-77",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-78",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "FI",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "isa-FI-panel",
      "name": "Flow indicator · panel",
      "library": "P&ID",
      "group": "Panel instruments",
      "standard": "ANSI/ISA-5.1",
      "category": "P&ID / ANSI/ISA-5.1 / Panel instruments",
      "entities": [
        {
          "id": "catalog-79",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-80",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -6,
            "y": 0
          },
          "b": {
            "x": 6,
            "y": 0
          }
        },
        {
          "id": "catalog-81",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "FI",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "isa-LI-field",
      "name": "Level indicator · field",
      "library": "P&ID",
      "group": "Field instruments",
      "standard": "ANSI/ISA-5.1",
      "category": "P&ID / ANSI/ISA-5.1 / Field instruments",
      "entities": [
        {
          "id": "catalog-82",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-83",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "LI",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "isa-LI-panel",
      "name": "Level indicator · panel",
      "library": "P&ID",
      "group": "Panel instruments",
      "standard": "ANSI/ISA-5.1",
      "category": "P&ID / ANSI/ISA-5.1 / Panel instruments",
      "entities": [
        {
          "id": "catalog-84",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-85",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -6,
            "y": 0
          },
          "b": {
            "x": 6,
            "y": 0
          }
        },
        {
          "id": "catalog-86",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "LI",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "isa-PIC-field",
      "name": "Pressure controller · field",
      "library": "P&ID",
      "group": "Field instruments",
      "standard": "ANSI/ISA-5.1",
      "category": "P&ID / ANSI/ISA-5.1 / Field instruments",
      "entities": [
        {
          "id": "catalog-87",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-88",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "PIC",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "isa-PIC-panel",
      "name": "Pressure controller · panel",
      "library": "P&ID",
      "group": "Panel instruments",
      "standard": "ANSI/ISA-5.1",
      "category": "P&ID / ANSI/ISA-5.1 / Panel instruments",
      "entities": [
        {
          "id": "catalog-89",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-90",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -6,
            "y": 0
          },
          "b": {
            "x": 6,
            "y": 0
          }
        },
        {
          "id": "catalog-91",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "PIC",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "isa-TIC-field",
      "name": "Temperature controller · field",
      "library": "P&ID",
      "group": "Field instruments",
      "standard": "ANSI/ISA-5.1",
      "category": "P&ID / ANSI/ISA-5.1 / Field instruments",
      "entities": [
        {
          "id": "catalog-92",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-93",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "TIC",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "isa-TIC-panel",
      "name": "Temperature controller · panel",
      "library": "P&ID",
      "group": "Panel instruments",
      "standard": "ANSI/ISA-5.1",
      "category": "P&ID / ANSI/ISA-5.1 / Panel instruments",
      "entities": [
        {
          "id": "catalog-94",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-95",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -6,
            "y": 0
          },
          "b": {
            "x": 6,
            "y": 0
          }
        },
        {
          "id": "catalog-96",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "TIC",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "isa-FIC-field",
      "name": "Flow controller · field",
      "library": "P&ID",
      "group": "Field instruments",
      "standard": "ANSI/ISA-5.1",
      "category": "P&ID / ANSI/ISA-5.1 / Field instruments",
      "entities": [
        {
          "id": "catalog-97",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-98",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "FIC",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "isa-FIC-panel",
      "name": "Flow controller · panel",
      "library": "P&ID",
      "group": "Panel instruments",
      "standard": "ANSI/ISA-5.1",
      "category": "P&ID / ANSI/ISA-5.1 / Panel instruments",
      "entities": [
        {
          "id": "catalog-99",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-100",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -6,
            "y": 0
          },
          "b": {
            "x": 6,
            "y": 0
          }
        },
        {
          "id": "catalog-101",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "FIC",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "isa-LIC-field",
      "name": "Level controller · field",
      "library": "P&ID",
      "group": "Field instruments",
      "standard": "ANSI/ISA-5.1",
      "category": "P&ID / ANSI/ISA-5.1 / Field instruments",
      "entities": [
        {
          "id": "catalog-102",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-103",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "LIC",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "isa-LIC-panel",
      "name": "Level controller · panel",
      "library": "P&ID",
      "group": "Panel instruments",
      "standard": "ANSI/ISA-5.1",
      "category": "P&ID / ANSI/ISA-5.1 / Panel instruments",
      "entities": [
        {
          "id": "catalog-104",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-105",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -6,
            "y": 0
          },
          "b": {
            "x": 6,
            "y": 0
          }
        },
        {
          "id": "catalog-106",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "LIC",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "isa-PSH-field",
      "name": "High-pressure switch · field",
      "library": "P&ID",
      "group": "Field instruments",
      "standard": "ANSI/ISA-5.1",
      "category": "P&ID / ANSI/ISA-5.1 / Field instruments",
      "entities": [
        {
          "id": "catalog-107",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-108",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "PSH",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "isa-PSH-panel",
      "name": "High-pressure switch · panel",
      "library": "P&ID",
      "group": "Panel instruments",
      "standard": "ANSI/ISA-5.1",
      "category": "P&ID / ANSI/ISA-5.1 / Panel instruments",
      "entities": [
        {
          "id": "catalog-109",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-110",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -6,
            "y": 0
          },
          "b": {
            "x": 6,
            "y": 0
          }
        },
        {
          "id": "catalog-111",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "PSH",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "isa-PSL-field",
      "name": "Low-pressure switch · field",
      "library": "P&ID",
      "group": "Field instruments",
      "standard": "ANSI/ISA-5.1",
      "category": "P&ID / ANSI/ISA-5.1 / Field instruments",
      "entities": [
        {
          "id": "catalog-112",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-113",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "PSL",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "isa-PSL-panel",
      "name": "Low-pressure switch · panel",
      "library": "P&ID",
      "group": "Panel instruments",
      "standard": "ANSI/ISA-5.1",
      "category": "P&ID / ANSI/ISA-5.1 / Panel instruments",
      "entities": [
        {
          "id": "catalog-114",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-115",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -6,
            "y": 0
          },
          "b": {
            "x": 6,
            "y": 0
          }
        },
        {
          "id": "catalog-116",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "PSL",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "isa-TSH-field",
      "name": "High-temperature switch · field",
      "library": "P&ID",
      "group": "Field instruments",
      "standard": "ANSI/ISA-5.1",
      "category": "P&ID / ANSI/ISA-5.1 / Field instruments",
      "entities": [
        {
          "id": "catalog-117",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-118",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "TSH",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "isa-TSH-panel",
      "name": "High-temperature switch · panel",
      "library": "P&ID",
      "group": "Panel instruments",
      "standard": "ANSI/ISA-5.1",
      "category": "P&ID / ANSI/ISA-5.1 / Panel instruments",
      "entities": [
        {
          "id": "catalog-119",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-120",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -6,
            "y": 0
          },
          "b": {
            "x": 6,
            "y": 0
          }
        },
        {
          "id": "catalog-121",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "TSH",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "isa-LSH-field",
      "name": "High-level switch · field",
      "library": "P&ID",
      "group": "Field instruments",
      "standard": "ANSI/ISA-5.1",
      "category": "P&ID / ANSI/ISA-5.1 / Field instruments",
      "entities": [
        {
          "id": "catalog-122",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-123",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "LSH",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "isa-LSH-panel",
      "name": "High-level switch · panel",
      "library": "P&ID",
      "group": "Panel instruments",
      "standard": "ANSI/ISA-5.1",
      "category": "P&ID / ANSI/ISA-5.1 / Panel instruments",
      "entities": [
        {
          "id": "catalog-124",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-125",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -6,
            "y": 0
          },
          "b": {
            "x": 6,
            "y": 0
          }
        },
        {
          "id": "catalog-126",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "LSH",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "isa-LSL-field",
      "name": "Low-level switch · field",
      "library": "P&ID",
      "group": "Field instruments",
      "standard": "ANSI/ISA-5.1",
      "category": "P&ID / ANSI/ISA-5.1 / Field instruments",
      "entities": [
        {
          "id": "catalog-127",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-128",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "LSL",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "isa-LSL-panel",
      "name": "Low-level switch · panel",
      "library": "P&ID",
      "group": "Panel instruments",
      "standard": "ANSI/ISA-5.1",
      "category": "P&ID / ANSI/ISA-5.1 / Panel instruments",
      "entities": [
        {
          "id": "catalog-129",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-130",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -6,
            "y": 0
          },
          "b": {
            "x": 6,
            "y": 0
          }
        },
        {
          "id": "catalog-131",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "LSL",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "isa-PDT-field",
      "name": "Differential-pressure transmitter · field",
      "library": "P&ID",
      "group": "Field instruments",
      "standard": "ANSI/ISA-5.1",
      "category": "P&ID / ANSI/ISA-5.1 / Field instruments",
      "entities": [
        {
          "id": "catalog-132",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-133",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "PDT",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "isa-PDT-panel",
      "name": "Differential-pressure transmitter · panel",
      "library": "P&ID",
      "group": "Panel instruments",
      "standard": "ANSI/ISA-5.1",
      "category": "P&ID / ANSI/ISA-5.1 / Panel instruments",
      "entities": [
        {
          "id": "catalog-134",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-135",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -6,
            "y": 0
          },
          "b": {
            "x": 6,
            "y": 0
          }
        },
        {
          "id": "catalog-136",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "PDT",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "isa-FE-field",
      "name": "Primary flow element · field",
      "library": "P&ID",
      "group": "Field instruments",
      "standard": "ANSI/ISA-5.1",
      "category": "P&ID / ANSI/ISA-5.1 / Field instruments",
      "entities": [
        {
          "id": "catalog-137",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-138",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "FE",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "isa-FE-panel",
      "name": "Primary flow element · panel",
      "library": "P&ID",
      "group": "Panel instruments",
      "standard": "ANSI/ISA-5.1",
      "category": "P&ID / ANSI/ISA-5.1 / Panel instruments",
      "entities": [
        {
          "id": "catalog-139",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-140",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -6,
            "y": 0
          },
          "b": {
            "x": 6,
            "y": 0
          }
        },
        {
          "id": "catalog-141",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "FE",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "isa-TE-field",
      "name": "Primary temperature element · field",
      "library": "P&ID",
      "group": "Field instruments",
      "standard": "ANSI/ISA-5.1",
      "category": "P&ID / ANSI/ISA-5.1 / Field instruments",
      "entities": [
        {
          "id": "catalog-142",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-143",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "TE",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "isa-TE-panel",
      "name": "Primary temperature element · panel",
      "library": "P&ID",
      "group": "Panel instruments",
      "standard": "ANSI/ISA-5.1",
      "category": "P&ID / ANSI/ISA-5.1 / Panel instruments",
      "entities": [
        {
          "id": "catalog-144",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-145",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -6,
            "y": 0
          },
          "b": {
            "x": 6,
            "y": 0
          }
        },
        {
          "id": "catalog-146",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "TE",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "isa-AIT-field",
      "name": "Analytical transmitter · field",
      "library": "P&ID",
      "group": "Field instruments",
      "standard": "ANSI/ISA-5.1",
      "category": "P&ID / ANSI/ISA-5.1 / Field instruments",
      "entities": [
        {
          "id": "catalog-147",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-148",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "AIT",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "isa-AIT-panel",
      "name": "Analytical transmitter · panel",
      "library": "P&ID",
      "group": "Panel instruments",
      "standard": "ANSI/ISA-5.1",
      "category": "P&ID / ANSI/ISA-5.1 / Panel instruments",
      "entities": [
        {
          "id": "catalog-149",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-150",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -6,
            "y": 0
          },
          "b": {
            "x": 6,
            "y": 0
          }
        },
        {
          "id": "catalog-151",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "AIT",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "isa-SIT-field",
      "name": "Speed transmitter · field",
      "library": "P&ID",
      "group": "Field instruments",
      "standard": "ANSI/ISA-5.1",
      "category": "P&ID / ANSI/ISA-5.1 / Field instruments",
      "entities": [
        {
          "id": "catalog-152",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-153",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "SIT",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "isa-SIT-panel",
      "name": "Speed transmitter · panel",
      "library": "P&ID",
      "group": "Panel instruments",
      "standard": "ANSI/ISA-5.1",
      "category": "P&ID / ANSI/ISA-5.1 / Panel instruments",
      "entities": [
        {
          "id": "catalog-154",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-155",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -6,
            "y": 0
          },
          "b": {
            "x": 6,
            "y": 0
          }
        },
        {
          "id": "catalog-156",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "SIT",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "isa-aux-panel",
      "name": "Auxiliary / back-of-panel instrument (double line)",
      "library": "P&ID",
      "group": "Instruments & measurement bubbles",
      "standard": "ANSI/ISA-5.1",
      "category": "P&ID / ANSI/ISA-5.1 / Instruments & measurement bubbles",
      "entities": [
        {
          "id": "catalog-157",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-158",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -5.6,
            "y": 1.5
          },
          "b": {
            "x": 5.6,
            "y": 1.5
          }
        },
        {
          "id": "catalog-159",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -5.6,
            "y": -1.5
          },
          "b": {
            "x": 5.6,
            "y": -1.5
          }
        },
        {
          "id": "catalog-160",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "XI",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "isa-interlock",
      "name": "Safety interlock logic (diamond)",
      "library": "P&ID",
      "group": "Instruments & measurement bubbles",
      "standard": "ANSI/ISA-5.1",
      "category": "P&ID / ANSI/ISA-5.1 / Instruments & measurement bubbles",
      "entities": [
        {
          "id": "catalog-161",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": 0,
              "y": 6
            },
            {
              "x": 6,
              "y": 0
            },
            {
              "x": 0,
              "y": -6
            },
            {
              "x": -6,
              "y": 0
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-162",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "XI",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "isa-plc-hex",
      "name": "Programmable logic / computer function (hexagon)",
      "library": "P&ID",
      "group": "Instruments & measurement bubbles",
      "standard": "ANSI/ISA-5.1",
      "category": "P&ID / ANSI/ISA-5.1 / Instruments & measurement bubbles",
      "entities": [
        {
          "id": "catalog-163",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": 0,
              "y": 6
            },
            {
              "x": 5.5,
              "y": 3
            },
            {
              "x": 5.5,
              "y": -3
            },
            {
              "x": 0,
              "y": -6
            },
            {
              "x": -5.5,
              "y": -3
            },
            {
              "x": -5.5,
              "y": 3
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-164",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -5.5,
            "y": 0
          },
          "b": {
            "x": 5.5,
            "y": 0
          }
        },
        {
          "id": "catalog-165",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "XI",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "bs1646-field",
      "name": "Field-mounted instrument bubble (BS 1646)",
      "library": "P&ID",
      "group": "Instruments & measurement bubbles",
      "standard": "BS 1646",
      "category": "P&ID / BS 1646 / Instruments & measurement bubbles",
      "entities": [
        {
          "id": "catalog-166",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-167",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "XI",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "bs1646-control-room",
      "name": "Control room instrument bubble (BS 1646)",
      "library": "P&ID",
      "group": "Instruments & measurement bubbles",
      "standard": "BS 1646",
      "category": "P&ID / BS 1646 / Instruments & measurement bubbles",
      "entities": [
        {
          "id": "catalog-168",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-169",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -6,
            "y": 0
          },
          "b": {
            "x": 6,
            "y": 0
          }
        },
        {
          "id": "catalog-170",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "XI",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "bs1646-local-panel",
      "name": "Local panel instrument bubble (BS 1646)",
      "library": "P&ID",
      "group": "Instruments & measurement bubbles",
      "standard": "BS 1646",
      "category": "P&ID / BS 1646 / Instruments & measurement bubbles",
      "entities": [
        {
          "id": "catalog-171",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-172",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -5.6,
            "y": -1.5
          },
          "b": {
            "x": 5.6,
            "y": -1.5
          }
        },
        {
          "id": "catalog-173",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -5.6,
            "y": 1.5
          },
          "b": {
            "x": 5.6,
            "y": 1.5
          }
        },
        {
          "id": "catalog-174",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "XI",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "din28004-field",
      "name": "Field measuring point bubble (DIN 28004)",
      "library": "P&ID",
      "group": "Instruments & measurement bubbles",
      "standard": "DIN 28004",
      "category": "P&ID / DIN 28004 / Instruments & measurement bubbles",
      "entities": [
        {
          "id": "catalog-175",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-176",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "XI",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "din28004-central",
      "name": "Central control panel bubble (DIN 28004)",
      "library": "P&ID",
      "group": "Instruments & measurement bubbles",
      "standard": "DIN 28004",
      "category": "P&ID / DIN 28004 / Instruments & measurement bubbles",
      "entities": [
        {
          "id": "catalog-177",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-178",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -6,
            "y": 0
          },
          "b": {
            "x": 6,
            "y": 0
          }
        },
        {
          "id": "catalog-179",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "XI",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "din28004-process-ctrl",
      "name": "Process control / DCS function (DIN 28004)",
      "library": "P&ID",
      "group": "Instruments & measurement bubbles",
      "standard": "DIN 28004",
      "category": "P&ID / DIN 28004 / Instruments & measurement bubbles",
      "entities": [
        {
          "id": "catalog-180",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -6,
              "y": -6
            },
            {
              "x": 6,
              "y": -6
            },
            {
              "x": 6,
              "y": 6
            },
            {
              "x": -6,
              "y": 6
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-181",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-182",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "XI",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "isa-dcs-fy",
      "name": "Flow computing relay (DCS/PLC)",
      "library": "P&ID",
      "group": "DCS and PLC functions",
      "standard": "ANSI/ISA-5.1",
      "category": "P&ID / ANSI/ISA-5.1 / DCS and PLC functions",
      "entities": [
        {
          "id": "catalog-183",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -6,
              "y": -6
            },
            {
              "x": 6,
              "y": -6
            },
            {
              "x": 6,
              "y": 6
            },
            {
              "x": -6,
              "y": 6
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-184",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-185",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -6,
            "y": 0
          },
          "b": {
            "x": 6,
            "y": 0
          }
        },
        {
          "id": "catalog-186",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "FY",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "isa-dcs-py",
      "name": "Pressure I/P converter (ISA-5.1)",
      "library": "P&ID",
      "group": "DCS and PLC functions",
      "standard": "ANSI/ISA-5.1",
      "category": "P&ID / ANSI/ISA-5.1 / DCS and PLC functions",
      "entities": [
        {
          "id": "catalog-187",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -6,
              "y": -6
            },
            {
              "x": 6,
              "y": -6
            },
            {
              "x": 6,
              "y": 6
            },
            {
              "x": -6,
              "y": 6
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-188",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-189",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -6,
            "y": 0
          },
          "b": {
            "x": 6,
            "y": 0
          }
        },
        {
          "id": "catalog-190",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "PY",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "isa-dcs-ty",
      "name": "Temperature signal converter (ISA-5.1)",
      "library": "P&ID",
      "group": "DCS and PLC functions",
      "standard": "ANSI/ISA-5.1",
      "category": "P&ID / ANSI/ISA-5.1 / DCS and PLC functions",
      "entities": [
        {
          "id": "catalog-191",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -6,
              "y": -6
            },
            {
              "x": 6,
              "y": -6
            },
            {
              "x": 6,
              "y": 6
            },
            {
              "x": -6,
              "y": 6
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-192",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-193",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -6,
            "y": 0
          },
          "b": {
            "x": 6,
            "y": 0
          }
        },
        {
          "id": "catalog-194",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "TY",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "isa-dcs-hs",
      "name": "Hand switch (ISA-5.1)",
      "library": "P&ID",
      "group": "DCS and PLC functions",
      "standard": "ANSI/ISA-5.1",
      "category": "P&ID / ANSI/ISA-5.1 / DCS and PLC functions",
      "entities": [
        {
          "id": "catalog-195",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -6,
              "y": -6
            },
            {
              "x": 6,
              "y": -6
            },
            {
              "x": 6,
              "y": 6
            },
            {
              "x": -6,
              "y": 6
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-196",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-197",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -6,
            "y": 0
          },
          "b": {
            "x": 6,
            "y": 0
          }
        },
        {
          "id": "catalog-198",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "HS",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "isa-dcs-lah",
      "name": "High-level alarm (DCS)",
      "library": "P&ID",
      "group": "DCS and PLC functions",
      "standard": "ANSI/ISA-5.1",
      "category": "P&ID / ANSI/ISA-5.1 / DCS and PLC functions",
      "entities": [
        {
          "id": "catalog-199",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -6,
              "y": -6
            },
            {
              "x": 6,
              "y": -6
            },
            {
              "x": 6,
              "y": 6
            },
            {
              "x": -6,
              "y": 6
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-200",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-201",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -6,
            "y": 0
          },
          "b": {
            "x": 6,
            "y": 0
          }
        },
        {
          "id": "catalog-202",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "LAH",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "isa-dcs-pah",
      "name": "High-pressure alarm (DCS)",
      "library": "P&ID",
      "group": "DCS and PLC functions",
      "standard": "ANSI/ISA-5.1",
      "category": "P&ID / ANSI/ISA-5.1 / DCS and PLC functions",
      "entities": [
        {
          "id": "catalog-203",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -6,
              "y": -6
            },
            {
              "x": 6,
              "y": -6
            },
            {
              "x": 6,
              "y": 6
            },
            {
              "x": -6,
              "y": 6
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-204",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-205",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -6,
            "y": 0
          },
          "b": {
            "x": 6,
            "y": 0
          }
        },
        {
          "id": "catalog-206",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "PROCESS",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "SIGNAL",
          "point": {
            "x": 0,
            "y": 6
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "PAH",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "process-filter",
      "name": "Y-strainer",
      "library": "P&ID",
      "group": "Piping and accessories",
      "standard": "ISO 14617",
      "category": "P&ID / ISO 14617 / Piping and accessories",
      "entities": [
        {
          "id": "catalog-207",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -10,
              "y": 0
            },
            {
              "x": -5,
              "y": 0
            },
            {
              "x": 0,
              "y": -5
            },
            {
              "x": 5,
              "y": 0
            },
            {
              "x": 10,
              "y": 0
            }
          ],
          "closed": false
        },
        {
          "id": "catalog-208",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -2,
              "y": -3
            },
            {
              "x": 1,
              "y": -6
            },
            {
              "x": 4,
              "y": -3
            }
          ],
          "closed": false
        },
        {
          "id": "catalog-209",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -1,
            "y": -2
          },
          "b": {
            "x": 2,
            "y": -5
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "STR",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "process-strainer",
      "name": "In-line filter",
      "library": "P&ID",
      "group": "Piping and accessories",
      "standard": "ISO 14617",
      "category": "P&ID / ISO 14617 / Piping and accessories",
      "entities": [
        {
          "id": "catalog-210",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -6,
              "y": -6
            },
            {
              "x": 6,
              "y": -6
            },
            {
              "x": 6,
              "y": 6
            },
            {
              "x": -6,
              "y": 6
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-211",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -5,
            "y": -5
          },
          "b": {
            "x": 5,
            "y": 5
          }
        },
        {
          "id": "catalog-212",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -6,
            "y": 0
          }
        },
        {
          "id": "catalog-213",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 6,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "FLT",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "process-orifice",
      "name": "Orifice plate",
      "library": "P&ID",
      "group": "Piping and accessories",
      "standard": "ISO 14617",
      "category": "P&ID / ISO 14617 / Piping and accessories",
      "entities": [
        {
          "id": "catalog-214",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        },
        {
          "id": "catalog-215",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": 6
          }
        },
        {
          "id": "catalog-216",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -3,
            "y": 6
          },
          "b": {
            "x": 3,
            "y": 6
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "FE",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "process-venturi",
      "name": "Venturi tube (ISO 14617)",
      "library": "P&ID",
      "group": "Piping and accessories",
      "standard": "ISO 14617",
      "category": "P&ID / ISO 14617 / Piping and accessories",
      "entities": [
        {
          "id": "catalog-217",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -10,
              "y": 4
            },
            {
              "x": -3,
              "y": 1.5
            },
            {
              "x": 3,
              "y": 1.5
            },
            {
              "x": 10,
              "y": 4
            }
          ],
          "closed": false
        },
        {
          "id": "catalog-218",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -10,
              "y": -4
            },
            {
              "x": -3,
              "y": -1.5
            },
            {
              "x": 3,
              "y": -1.5
            },
            {
              "x": 10,
              "y": -4
            }
          ],
          "closed": false
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "FE",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "process-rupture-disc",
      "name": "Rupture / bursting disc (ISO 14617)",
      "library": "P&ID",
      "group": "Piping and accessories",
      "standard": "ISO 14617",
      "category": "P&ID / ISO 14617 / Piping and accessories",
      "entities": [
        {
          "id": "catalog-219",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -4,
              "y": -5
            },
            {
              "x": 4,
              "y": -5
            },
            {
              "x": 4,
              "y": 5
            },
            {
              "x": -4,
              "y": 5
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-220",
          "layer": "0",
          "type": "arc",
          "center": {
            "x": -2,
            "y": 0
          },
          "radius": 5,
          "start": -50,
          "end": 50
        },
        {
          "id": "catalog-221",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -4,
            "y": 0
          }
        },
        {
          "id": "catalog-222",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 4,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "PSE",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "process-flame-arrestor",
      "name": "Flame arrestor (ISO 14617)",
      "library": "P&ID",
      "group": "Piping and accessories",
      "standard": "ISO 14617",
      "category": "P&ID / ISO 14617 / Piping and accessories",
      "entities": [
        {
          "id": "catalog-223",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -5,
              "y": -5
            },
            {
              "x": 5,
              "y": -5
            },
            {
              "x": 5,
              "y": 5
            },
            {
              "x": -5,
              "y": 5
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-224",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -2,
            "y": -5
          },
          "b": {
            "x": -2,
            "y": 5
          }
        },
        {
          "id": "catalog-225",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -5
          },
          "b": {
            "x": 0,
            "y": 5
          }
        },
        {
          "id": "catalog-226",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 2,
            "y": -5
          },
          "b": {
            "x": 2,
            "y": 5
          }
        },
        {
          "id": "catalog-227",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -5,
            "y": 0
          }
        },
        {
          "id": "catalog-228",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 5,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "FA",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "process-sight-glass",
      "name": "Sight glass (ISO 14617)",
      "library": "P&ID",
      "group": "Piping and accessories",
      "standard": "ISO 14617",
      "category": "P&ID / ISO 14617 / Piping and accessories",
      "entities": [
        {
          "id": "catalog-229",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 4
        },
        {
          "id": "catalog-230",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 2
        },
        {
          "id": "catalog-231",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -4,
            "y": 0
          }
        },
        {
          "id": "catalog-232",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 4,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "SG",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "process-expansion-joint",
      "name": "Expansion joint / bellows (ISO 14617)",
      "library": "P&ID",
      "group": "Piping and accessories",
      "standard": "ISO 14617",
      "category": "P&ID / ISO 14617 / Piping and accessories",
      "entities": [
        {
          "id": "catalog-233",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -10,
              "y": 0
            },
            {
              "x": -5,
              "y": 0
            },
            {
              "x": -3,
              "y": 4
            },
            {
              "x": -1,
              "y": -4
            },
            {
              "x": 1,
              "y": 4
            },
            {
              "x": 3,
              "y": -4
            },
            {
              "x": 5,
              "y": 0
            },
            {
              "x": 10,
              "y": 0
            }
          ],
          "closed": false
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "EJ",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "process-reducer",
      "name": "Concentric reducer",
      "library": "P&ID",
      "group": "Piping and accessories",
      "standard": "ISO 14617",
      "category": "P&ID / ISO 14617 / Piping and accessories",
      "entities": [
        {
          "id": "catalog-234",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -10,
              "y": -4
            },
            {
              "x": 10,
              "y": -2
            }
          ],
          "closed": false
        },
        {
          "id": "catalog-235",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -10,
              "y": 4
            },
            {
              "x": 10,
              "y": 2
            }
          ],
          "closed": false
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "RED",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "process-flange",
      "name": "Flanged joint",
      "library": "P&ID",
      "group": "Piping and accessories",
      "standard": "ISO 14617",
      "category": "P&ID / ISO 14617 / Piping and accessories",
      "entities": [
        {
          "id": "catalog-236",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        },
        {
          "id": "catalog-237",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -1,
            "y": -5
          },
          "b": {
            "x": -1,
            "y": 5
          }
        },
        {
          "id": "catalog-238",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 1,
            "y": -5
          },
          "b": {
            "x": 1,
            "y": 5
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "process-blind",
      "name": "Blind flange",
      "library": "P&ID",
      "group": "Piping and accessories",
      "standard": "ISO 14617",
      "category": "P&ID / ISO 14617 / Piping and accessories",
      "entities": [
        {
          "id": "catalog-239",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": 0,
            "y": 0
          }
        },
        {
          "id": "catalog-240",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -5
          },
          "b": {
            "x": 0,
            "y": 5
          }
        },
        {
          "id": "catalog-241",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 2,
            "y": -5
          },
          "b": {
            "x": 2,
            "y": 5
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "process-flow-arrow",
      "name": "Flow direction",
      "library": "P&ID",
      "group": "Piping and accessories",
      "standard": "ISO 14617",
      "category": "P&ID / ISO 14617 / Piping and accessories",
      "entities": [
        {
          "id": "catalog-242",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        },
        {
          "id": "catalog-243",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": 5,
              "y": 3
            },
            {
              "x": 10,
              "y": 0
            },
            {
              "x": 5,
              "y": -3
            }
          ],
          "closed": false
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "process-compressor",
      "name": "Compressor",
      "library": "P&ID",
      "group": "Equipment",
      "standard": "ISO 10628",
      "category": "P&ID / ISO 10628 / Equipment",
      "entities": [
        {
          "id": "catalog-244",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-245",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -3,
              "y": -4
            },
            {
              "x": 4,
              "y": 0
            },
            {
              "x": -3,
              "y": 4
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-246",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -6,
            "y": 0
          }
        },
        {
          "id": "catalog-247",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 6,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        },
        {
          "id": "catalog-248",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -1,
            "y": -3
          },
          "text": "C",
          "height": 2,
          "rotation": 0
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "K",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "process-blower",
      "name": "Rotary blower / fan (ISO 10628)",
      "library": "P&ID",
      "group": "Equipment",
      "standard": "ISO 10628",
      "category": "P&ID / ISO 10628 / Equipment",
      "entities": [
        {
          "id": "catalog-249",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-250",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -4,
            "y": -4
          },
          "b": {
            "x": 5,
            "y": -2
          }
        },
        {
          "id": "catalog-251",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -4,
            "y": 4
          },
          "b": {
            "x": 5,
            "y": 2
          }
        },
        {
          "id": "catalog-252",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -6,
            "y": 0
          }
        },
        {
          "id": "catalog-253",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 6,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "B",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "process-gear-pump",
      "name": "Positive-displacement pump",
      "library": "P&ID",
      "group": "Equipment",
      "standard": "ISO 10628",
      "category": "P&ID / ISO 10628 / Equipment",
      "entities": [
        {
          "id": "catalog-254",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": -2,
            "y": 0
          },
          "radius": 4
        },
        {
          "id": "catalog-255",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 2,
            "y": 0
          },
          "radius": 4
        },
        {
          "id": "catalog-256",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -6,
            "y": 0
          }
        },
        {
          "id": "catalog-257",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 6,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "P",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "process-vessel",
      "name": "Pressure vessel",
      "library": "P&ID",
      "group": "Equipment",
      "standard": "ISO 10628",
      "category": "P&ID / ISO 10628 / Equipment",
      "entities": [
        {
          "id": "catalog-258",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -6,
              "y": -7
            },
            {
              "x": -6,
              "y": 7
            },
            {
              "x": -3,
              "y": 10
            },
            {
              "x": 3,
              "y": 10
            },
            {
              "x": 6,
              "y": 7
            },
            {
              "x": 6,
              "y": -7
            },
            {
              "x": 3,
              "y": -10
            },
            {
              "x": -3,
              "y": -10
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-259",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -6,
            "y": 0
          }
        },
        {
          "id": "catalog-260",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 6,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "V",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "process-distillation-column",
      "name": "Distillation / tray column (ISO 10628)",
      "library": "P&ID",
      "group": "Equipment",
      "standard": "ISO 10628",
      "category": "P&ID / ISO 10628 / Equipment",
      "entities": [
        {
          "id": "catalog-261",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -5,
              "y": -10
            },
            {
              "x": -5,
              "y": 10
            },
            {
              "x": -3,
              "y": 12
            },
            {
              "x": 3,
              "y": 12
            },
            {
              "x": 5,
              "y": 10
            },
            {
              "x": 5,
              "y": -10
            },
            {
              "x": 3,
              "y": -12
            },
            {
              "x": -3,
              "y": -12
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-262",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -5,
            "y": 5
          },
          "b": {
            "x": 5,
            "y": 5
          }
        },
        {
          "id": "catalog-263",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -5,
            "y": 0
          },
          "b": {
            "x": 5,
            "y": 0
          }
        },
        {
          "id": "catalog-264",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -5,
            "y": -5
          },
          "b": {
            "x": 5,
            "y": -5
          }
        },
        {
          "id": "catalog-265",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -5,
            "y": 0
          }
        },
        {
          "id": "catalog-266",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 5,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "C",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "process-plate-exchanger",
      "name": "Plate heat exchanger (ISO 10628)",
      "library": "P&ID",
      "group": "Equipment",
      "standard": "ISO 10628",
      "category": "P&ID / ISO 10628 / Equipment",
      "entities": [
        {
          "id": "catalog-267",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -6,
              "y": -8
            },
            {
              "x": 6,
              "y": -8
            },
            {
              "x": 6,
              "y": 8
            },
            {
              "x": -6,
              "y": 8
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-268",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -3,
            "y": -8
          },
          "b": {
            "x": -3,
            "y": 8
          }
        },
        {
          "id": "catalog-269",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -8
          },
          "b": {
            "x": 0,
            "y": 8
          }
        },
        {
          "id": "catalog-270",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 3,
            "y": -8
          },
          "b": {
            "x": 3,
            "y": 8
          }
        },
        {
          "id": "catalog-271",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -6,
            "y": 0
          }
        },
        {
          "id": "catalog-272",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 6,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "E",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "process-cyclone",
      "name": "Cyclone separator (ISO 10628)",
      "library": "P&ID",
      "group": "Equipment",
      "standard": "ISO 10628",
      "category": "P&ID / ISO 10628 / Equipment",
      "entities": [
        {
          "id": "catalog-273",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -6,
              "y": 8
            },
            {
              "x": 6,
              "y": 8
            },
            {
              "x": 6,
              "y": 2
            },
            {
              "x": 0,
              "y": -9
            },
            {
              "x": -6,
              "y": 2
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-274",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -6,
            "y": 0
          }
        },
        {
          "id": "catalog-275",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 6,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "S",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "process-open-tank",
      "name": "Open tank",
      "library": "P&ID",
      "group": "Equipment",
      "standard": "ISO 10628",
      "category": "P&ID / ISO 10628 / Equipment",
      "entities": [
        {
          "id": "catalog-276",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -7,
              "y": 9
            },
            {
              "x": -7,
              "y": -8
            },
            {
              "x": 7,
              "y": -8
            },
            {
              "x": 7,
              "y": 9
            }
          ],
          "closed": false
        },
        {
          "id": "catalog-277",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -7,
            "y": 0
          }
        },
        {
          "id": "catalog-278",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 7,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "TK",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "process-agitator",
      "name": "Agitated tank",
      "library": "P&ID",
      "group": "Equipment",
      "standard": "ISO 10628",
      "category": "P&ID / ISO 10628 / Equipment",
      "entities": [
        {
          "id": "catalog-279",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -7,
              "y": -8
            },
            {
              "x": 7,
              "y": -8
            },
            {
              "x": 7,
              "y": 8
            },
            {
              "x": -7,
              "y": 8
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-280",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 12
          },
          "b": {
            "x": 0,
            "y": -4
          }
        },
        {
          "id": "catalog-281",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -4,
            "y": -4
          },
          "b": {
            "x": 4,
            "y": -4
          }
        },
        {
          "id": "catalog-282",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 14
          },
          "radius": 2
        },
        {
          "id": "catalog-283",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -7,
            "y": 0
          }
        },
        {
          "id": "catalog-284",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 7,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "R",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "process-heater",
      "name": "Electric heater",
      "library": "P&ID",
      "group": "Equipment",
      "standard": "ISO 10628",
      "category": "P&ID / ISO 10628 / Equipment",
      "entities": [
        {
          "id": "catalog-285",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -7,
              "y": -5
            },
            {
              "x": 7,
              "y": -5
            },
            {
              "x": 7,
              "y": 5
            },
            {
              "x": -7,
              "y": 5
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-286",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -10,
              "y": 0
            },
            {
              "x": -5,
              "y": 0
            },
            {
              "x": -3,
              "y": 3
            },
            {
              "x": -1,
              "y": -3
            },
            {
              "x": 1,
              "y": 3
            },
            {
              "x": 3,
              "y": -3
            },
            {
              "x": 5,
              "y": 0
            },
            {
              "x": 10,
              "y": 0
            }
          ],
          "closed": false
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "E",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "process-cooler",
      "name": "Cooler",
      "library": "P&ID",
      "group": "Equipment",
      "standard": "ISO 10628",
      "category": "P&ID / ISO 10628 / Equipment",
      "entities": [
        {
          "id": "catalog-287",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-288",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        },
        {
          "id": "catalog-289",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -5
          },
          "b": {
            "x": 0,
            "y": 5
          }
        },
        {
          "id": "catalog-290",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -3,
              "y": 2
            },
            {
              "x": 0,
              "y": 5
            },
            {
              "x": 3,
              "y": 2
            }
          ],
          "closed": false
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "E",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "process-steam-trap",
      "name": "Steam trap",
      "library": "P&ID",
      "group": "Piping and accessories",
      "standard": "ISO 14617",
      "category": "P&ID / ISO 14617 / Piping and accessories",
      "entities": [
        {
          "id": "catalog-291",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -5,
              "y": -4
            },
            {
              "x": 5,
              "y": -4
            },
            {
              "x": 5,
              "y": 4
            },
            {
              "x": -5,
              "y": 4
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-292",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -3,
            "y": -1
          },
          "text": "ST",
          "height": 2.5,
          "rotation": 0
        },
        {
          "id": "catalog-293",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -5,
            "y": 0
          }
        },
        {
          "id": "catalog-294",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 5,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "ST",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "process-silencer",
      "name": "Silencer",
      "library": "P&ID",
      "group": "Piping and accessories",
      "standard": "ISO 14617",
      "category": "P&ID / ISO 14617 / Piping and accessories",
      "entities": [
        {
          "id": "catalog-295",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -6,
              "y": -4
            },
            {
              "x": 6,
              "y": -4
            },
            {
              "x": 6,
              "y": 4
            },
            {
              "x": -6,
              "y": 4
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-296",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -3,
            "y": -4
          },
          "b": {
            "x": -3,
            "y": 4
          }
        },
        {
          "id": "catalog-297",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -4
          },
          "b": {
            "x": 0,
            "y": 4
          }
        },
        {
          "id": "catalog-298",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 3,
            "y": -4
          },
          "b": {
            "x": 3,
            "y": 4
          }
        },
        {
          "id": "catalog-299",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -6,
            "y": 0
          }
        },
        {
          "id": "catalog-300",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 6,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "SIL",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "process-din-plate-hx",
      "name": "Plate heat exchanger (DIN 28004)",
      "library": "P&ID",
      "group": "Equipment",
      "standard": "DIN 28004",
      "category": "P&ID / DIN 28004 / Equipment",
      "entities": [
        {
          "id": "catalog-301",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -7,
              "y": -6
            },
            {
              "x": 7,
              "y": -6
            },
            {
              "x": 7,
              "y": 6
            },
            {
              "x": -7,
              "y": 6
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-302",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -4,
            "y": -6
          },
          "b": {
            "x": -4,
            "y": 6
          }
        },
        {
          "id": "catalog-303",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -1,
            "y": -6
          },
          "b": {
            "x": -1,
            "y": 6
          }
        },
        {
          "id": "catalog-304",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 2,
            "y": -6
          },
          "b": {
            "x": 2,
            "y": 6
          }
        },
        {
          "id": "catalog-305",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 5,
            "y": -6
          },
          "b": {
            "x": 5,
            "y": 6
          }
        },
        {
          "id": "catalog-306",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 3
          },
          "b": {
            "x": -7,
            "y": 3
          }
        },
        {
          "id": "catalog-307",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": -3
          },
          "b": {
            "x": -7,
            "y": -3
          }
        },
        {
          "id": "catalog-308",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 7,
            "y": 3
          },
          "b": {
            "x": 10,
            "y": 3
          }
        },
        {
          "id": "catalog-309",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 7,
            "y": -3
          },
          "b": {
            "x": 10,
            "y": -3
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "E",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "process-din-jacketed-vessel",
      "name": "Jacketed vessel (DIN 28004)",
      "library": "P&ID",
      "group": "Equipment",
      "standard": "DIN 28004",
      "category": "P&ID / DIN 28004 / Equipment",
      "entities": [
        {
          "id": "catalog-310",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -6,
              "y": -8
            },
            {
              "x": 6,
              "y": -8
            },
            {
              "x": 6,
              "y": 8
            },
            {
              "x": -6,
              "y": 8
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-311",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -8,
              "y": 5
            },
            {
              "x": -8,
              "y": -9
            },
            {
              "x": 8,
              "y": -9
            },
            {
              "x": 8,
              "y": 5
            }
          ],
          "closed": false
        },
        {
          "id": "catalog-312",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -8,
            "y": 0
          }
        },
        {
          "id": "catalog-313",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 8,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "R",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "process-din-cyclone",
      "name": "Cyclone separator (DIN 28004)",
      "library": "P&ID",
      "group": "Equipment",
      "standard": "DIN 28004",
      "category": "P&ID / DIN 28004 / Equipment",
      "entities": [
        {
          "id": "catalog-314",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -6,
              "y": 7
            },
            {
              "x": 6,
              "y": 7
            },
            {
              "x": 6,
              "y": 1
            },
            {
              "x": 1.5,
              "y": -8
            },
            {
              "x": -1.5,
              "y": -8
            },
            {
              "x": -6,
              "y": 1
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-315",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 5
          },
          "b": {
            "x": -6,
            "y": 5
          }
        },
        {
          "id": "catalog-316",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 7
          },
          "b": {
            "x": 0,
            "y": 10
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "CY",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "process-din-rotary-valve",
      "name": "Rotary feeder / airlock (DIN 28004)",
      "library": "P&ID",
      "group": "Equipment",
      "standard": "DIN 28004",
      "category": "P&ID / DIN 28004 / Equipment",
      "entities": [
        {
          "id": "catalog-317",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 5
        },
        {
          "id": "catalog-318",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -3.5,
            "y": -3.5
          },
          "b": {
            "x": 3.5,
            "y": 3.5
          }
        },
        {
          "id": "catalog-319",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -3.5,
            "y": 3.5
          },
          "b": {
            "x": 3.5,
            "y": -3.5
          }
        },
        {
          "id": "catalog-320",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -5,
            "y": 0
          },
          "b": {
            "x": 5,
            "y": 0
          }
        },
        {
          "id": "catalog-321",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 5
          },
          "b": {
            "x": 0,
            "y": 10
          }
        },
        {
          "id": "catalog-322",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -5
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "RF",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "process-din-flame-arrester",
      "name": "Flame arrester (DIN 28004)",
      "library": "P&ID",
      "group": "Equipment",
      "standard": "DIN 28004",
      "category": "P&ID / DIN 28004 / Equipment",
      "entities": [
        {
          "id": "catalog-323",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -5,
              "y": -4
            },
            {
              "x": 5,
              "y": -4
            },
            {
              "x": 5,
              "y": 4
            },
            {
              "x": -5,
              "y": 4
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-324",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -3,
            "y": -4
          },
          "b": {
            "x": -3,
            "y": 4
          }
        },
        {
          "id": "catalog-325",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -4
          },
          "b": {
            "x": 0,
            "y": 4
          }
        },
        {
          "id": "catalog-326",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 3,
            "y": -4
          },
          "b": {
            "x": 3,
            "y": 4
          }
        },
        {
          "id": "catalog-327",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -5,
            "y": -2
          },
          "b": {
            "x": 5,
            "y": 2
          }
        },
        {
          "id": "catalog-328",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -5,
            "y": 0
          }
        },
        {
          "id": "catalog-329",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 5,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "FA",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "process-bs-bursting-disc",
      "name": "Bursting / rupture disc (BS 1646)",
      "library": "P&ID",
      "group": "Equipment",
      "standard": "BS 1646",
      "category": "P&ID / BS 1646 / Equipment",
      "entities": [
        {
          "id": "catalog-330",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -4,
            "y": 0
          }
        },
        {
          "id": "catalog-331",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 4,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        },
        {
          "id": "catalog-332",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -4,
            "y": -5
          },
          "b": {
            "x": -4,
            "y": 5
          }
        },
        {
          "id": "catalog-333",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 4,
            "y": -5
          },
          "b": {
            "x": 4,
            "y": 5
          }
        },
        {
          "id": "catalog-334",
          "layer": "0",
          "type": "arc",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 4,
          "start": -60,
          "end": 60
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "PSE",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "process-bs-orifice-plate",
      "name": "Orifice restriction plate (BS 1646)",
      "library": "P&ID",
      "group": "Equipment",
      "standard": "BS 1646",
      "category": "P&ID / BS 1646 / Equipment",
      "entities": [
        {
          "id": "catalog-335",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        },
        {
          "id": "catalog-336",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -1,
            "y": -5
          },
          "b": {
            "x": -1,
            "y": -1.5
          }
        },
        {
          "id": "catalog-337",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -1,
            "y": 1.5
          },
          "b": {
            "x": -1,
            "y": 5
          }
        },
        {
          "id": "catalog-338",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 1,
            "y": -5
          },
          "b": {
            "x": 1,
            "y": -1.5
          }
        },
        {
          "id": "catalog-339",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 1,
            "y": 1.5
          },
          "b": {
            "x": 1,
            "y": 5
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "FO",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "pid-pump-centrifugal-motor",
      "name": "Centrifugal pump + motor skid (Industrial)",
      "library": "P&ID",
      "group": "Pumps & Drives",
      "standard": "Industrial",
      "category": "P&ID / Industrial / Pumps & Drives",
      "entities": [
        {
          "id": "catalog-340",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": -3,
            "y": 0
          },
          "radius": 5
        },
        {
          "id": "catalog-341",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -6.5,
              "y": -3.5
            },
            {
              "x": 1,
              "y": 0
            },
            {
              "x": -6.5,
              "y": 3.5
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-342",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -3,
            "y": 5
          },
          "b": {
            "x": 2,
            "y": 5
          }
        },
        {
          "id": "catalog-343",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -8,
            "y": 0
          }
        },
        {
          "id": "catalog-344",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 2,
            "y": 0
          },
          "b": {
            "x": 5,
            "y": 0
          }
        },
        {
          "id": "catalog-345",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 7,
            "y": 0
          },
          "radius": 3
        },
        {
          "id": "catalog-346",
          "layer": "0",
          "type": "text",
          "position": {
            "x": 5.8,
            "y": -1
          },
          "text": "M",
          "height": 2.2,
          "rotation": 0
        },
        {
          "id": "catalog-347",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -4,
            "y": -6
          },
          "b": {
            "x": 10,
            "y": -6
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 2,
            "y": 5
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "P",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "pid-pump-screw",
      "name": "Screw / progressive cavity pump",
      "library": "P&ID",
      "group": "Pumps & Drives",
      "standard": "ISO 10628",
      "category": "P&ID / ISO 10628 / Pumps & Drives",
      "entities": [
        {
          "id": "catalog-348",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -7,
              "y": -4
            },
            {
              "x": 7,
              "y": -4
            },
            {
              "x": 7,
              "y": 4
            },
            {
              "x": -7,
              "y": 4
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-349",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -5,
              "y": -2
            },
            {
              "x": -2,
              "y": 2
            },
            {
              "x": 1,
              "y": -2
            },
            {
              "x": 4,
              "y": 2
            }
          ],
          "closed": false
        },
        {
          "id": "catalog-350",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -7,
            "y": 0
          }
        },
        {
          "id": "catalog-351",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 7,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "P",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "pid-pump-diaphragm",
      "name": "Diaphragm metering pump",
      "library": "P&ID",
      "group": "Pumps & Drives",
      "standard": "ISO 10628",
      "category": "P&ID / ISO 10628 / Pumps & Drives",
      "entities": [
        {
          "id": "catalog-352",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-353",
          "layer": "0",
          "type": "arc",
          "center": {
            "x": -1,
            "y": 0
          },
          "radius": 5,
          "start": -70,
          "end": 70
        },
        {
          "id": "catalog-354",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -6,
            "y": -3
          },
          "b": {
            "x": -2,
            "y": -3
          }
        },
        {
          "id": "catalog-355",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -6,
            "y": 3
          },
          "b": {
            "x": -2,
            "y": 3
          }
        },
        {
          "id": "catalog-356",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -6,
            "y": 0
          }
        },
        {
          "id": "catalog-357",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 6,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "P",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "pid-pump-reciprocating",
      "name": "Reciprocating piston / plunger pump",
      "library": "P&ID",
      "group": "Pumps & Drives",
      "standard": "Industrial",
      "category": "P&ID / Industrial / Pumps & Drives",
      "entities": [
        {
          "id": "catalog-358",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-359",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -3.5,
              "y": -2.5
            },
            {
              "x": 3.5,
              "y": -2.5
            },
            {
              "x": 3.5,
              "y": 2.5
            },
            {
              "x": -3.5,
              "y": 2.5
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-360",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -7,
            "y": 0
          },
          "b": {
            "x": -3.5,
            "y": 0
          }
        },
        {
          "id": "catalog-361",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -6,
            "y": 0
          }
        },
        {
          "id": "catalog-362",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 6,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "P",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "pid-pump-submersible",
      "name": "Vertical sump / submersible pump",
      "library": "P&ID",
      "group": "Pumps & Drives",
      "standard": "Industrial",
      "category": "P&ID / Industrial / Pumps & Drives",
      "entities": [
        {
          "id": "catalog-363",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -2,
              "y": -8
            },
            {
              "x": 2,
              "y": -8
            },
            {
              "x": 2,
              "y": 8
            },
            {
              "x": -2,
              "y": 8
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-364",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": -5
          },
          "radius": 4
        },
        {
          "id": "catalog-365",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 8
          },
          "b": {
            "x": 0,
            "y": 11
          }
        },
        {
          "id": "catalog-366",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 12.5
          },
          "radius": 1.8
        },
        {
          "id": "catalog-367",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -7,
            "y": 6
          },
          "b": {
            "x": 7,
            "y": 6
          }
        },
        {
          "id": "catalog-368",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 4,
            "y": -5
          },
          "b": {
            "x": 10,
            "y": -5
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": -9
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": -5
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "P",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "pid-comp-centrifugal",
      "name": "Centrifugal compressor (trapezoid casing)",
      "library": "P&ID",
      "group": "Compressors & Turbines",
      "standard": "ISO 10628",
      "category": "P&ID / ISO 10628 / Compressors & Turbines",
      "entities": [
        {
          "id": "catalog-369",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -6,
              "y": -7
            },
            {
              "x": 6,
              "y": -4
            },
            {
              "x": 6,
              "y": 4
            },
            {
              "x": -6,
              "y": 7
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-370",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -6,
            "y": 0
          }
        },
        {
          "id": "catalog-371",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 6,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "K",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "pid-comp-reciprocating",
      "name": "Reciprocating compressor (Industrial box)",
      "library": "P&ID",
      "group": "Compressors & Turbines",
      "standard": "Industrial",
      "category": "P&ID / Industrial / Compressors & Turbines",
      "entities": [
        {
          "id": "catalog-372",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -6,
              "y": -5
            },
            {
              "x": 6,
              "y": -5
            },
            {
              "x": 6,
              "y": 5
            },
            {
              "x": -6,
              "y": 5
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-373",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -2,
            "y": -5
          },
          "b": {
            "x": -2,
            "y": 5
          }
        },
        {
          "id": "catalog-374",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -2,
            "y": 0
          },
          "b": {
            "x": 6,
            "y": 0
          }
        },
        {
          "id": "catalog-375",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -6,
            "y": 0
          }
        },
        {
          "id": "catalog-376",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 6,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "K",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "pid-comp-screw",
      "name": "Rotary screw compressor",
      "library": "P&ID",
      "group": "Compressors & Turbines",
      "standard": "ISO 10628",
      "category": "P&ID / ISO 10628 / Compressors & Turbines",
      "entities": [
        {
          "id": "catalog-377",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -6,
              "y": -6
            },
            {
              "x": 6,
              "y": -3.5
            },
            {
              "x": 6,
              "y": 3.5
            },
            {
              "x": -6,
              "y": 6
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-378",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -4,
            "y": -3
          },
          "b": {
            "x": 4,
            "y": 3
          }
        },
        {
          "id": "catalog-379",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -4,
            "y": 3
          },
          "b": {
            "x": 4,
            "y": -3
          }
        },
        {
          "id": "catalog-380",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -6,
            "y": 0
          }
        },
        {
          "id": "catalog-381",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 6,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "K",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "pid-turbine-steam",
      "name": "Steam turbine (ISO 10628)",
      "library": "P&ID",
      "group": "Compressors & Turbines",
      "standard": "ISO 10628",
      "category": "P&ID / ISO 10628 / Compressors & Turbines",
      "entities": [
        {
          "id": "catalog-382",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -6,
              "y": -4
            },
            {
              "x": 6,
              "y": -7.5
            },
            {
              "x": 6,
              "y": 7.5
            },
            {
              "x": -6,
              "y": 4
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-383",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -6,
            "y": 0
          }
        },
        {
          "id": "catalog-384",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 6,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        },
        {
          "id": "catalog-385",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -2,
            "y": -1
          },
          "text": "ST",
          "height": 2.5,
          "rotation": 0
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "TB",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "pid-turbine-gas",
      "name": "Gas turbine / expander",
      "library": "P&ID",
      "group": "Compressors & Turbines",
      "standard": "Industrial",
      "category": "P&ID / Industrial / Compressors & Turbines",
      "entities": [
        {
          "id": "catalog-386",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -6,
              "y": -4
            },
            {
              "x": 6,
              "y": -7.5
            },
            {
              "x": 6,
              "y": 7.5
            },
            {
              "x": -6,
              "y": 4
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-387",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -6,
            "y": 0
          }
        },
        {
          "id": "catalog-388",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 6,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        },
        {
          "id": "catalog-389",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -2,
            "y": -1
          },
          "text": "GT",
          "height": 2.5,
          "rotation": 0
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "GT",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "pid-fan-centrifugal",
      "name": "Centrifugal fan / ventilator",
      "library": "P&ID",
      "group": "Fans & Blowers",
      "standard": "ISO 10628",
      "category": "P&ID / ISO 10628 / Fans & Blowers",
      "entities": [
        {
          "id": "catalog-390",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-391",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 6
          },
          "b": {
            "x": 8,
            "y": 6
          }
        },
        {
          "id": "catalog-392",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 6,
            "y": 0
          },
          "b": {
            "x": 8,
            "y": 6
          }
        },
        {
          "id": "catalog-393",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -3,
            "y": -3
          },
          "b": {
            "x": 3,
            "y": 3
          }
        },
        {
          "id": "catalog-394",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -3,
            "y": 3
          },
          "b": {
            "x": 3,
            "y": -3
          }
        },
        {
          "id": "catalog-395",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -6,
            "y": 0
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 8,
            "y": 6
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "FN",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "pid-fan-axial",
      "name": "Axial flow fan / propeller blower",
      "library": "P&ID",
      "group": "Fans & Blowers",
      "standard": "Industrial",
      "category": "P&ID / Industrial / Fans & Blowers",
      "entities": [
        {
          "id": "catalog-396",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -5,
              "y": -6
            },
            {
              "x": 5,
              "y": -6
            },
            {
              "x": 5,
              "y": 6
            },
            {
              "x": -5,
              "y": 6
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-397",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -5
          },
          "b": {
            "x": 0,
            "y": 5
          }
        },
        {
          "id": "catalog-398",
          "layer": "0",
          "type": "arc",
          "center": {
            "x": -2,
            "y": 0
          },
          "radius": 4,
          "start": -60,
          "end": 60
        },
        {
          "id": "catalog-399",
          "layer": "0",
          "type": "arc",
          "center": {
            "x": 2,
            "y": 0
          },
          "radius": 4,
          "start": 120,
          "end": 240
        },
        {
          "id": "catalog-400",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -5,
            "y": 0
          }
        },
        {
          "id": "catalog-401",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 5,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "FN",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "pid-drum-vertical",
      "name": "Vertical process drum / vessel (vaso)",
      "library": "P&ID",
      "group": "Vessels & Tanks",
      "standard": "ISO 10628",
      "category": "P&ID / ISO 10628 / Vessels & Tanks",
      "entities": [
        {
          "id": "catalog-402",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -5,
              "y": -7
            },
            {
              "x": -5,
              "y": 7
            }
          ],
          "closed": false
        },
        {
          "id": "catalog-403",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": 5,
              "y": -7
            },
            {
              "x": 5,
              "y": 7
            }
          ],
          "closed": false
        },
        {
          "id": "catalog-404",
          "layer": "0",
          "type": "arc",
          "center": {
            "x": 0,
            "y": 7
          },
          "radius": 5,
          "start": 0,
          "end": 180
        },
        {
          "id": "catalog-405",
          "layer": "0",
          "type": "arc",
          "center": {
            "x": 0,
            "y": -7
          },
          "radius": 5,
          "start": 180,
          "end": 360
        },
        {
          "id": "catalog-406",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 3
          },
          "b": {
            "x": -5,
            "y": 3
          }
        },
        {
          "id": "catalog-407",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 5,
            "y": -3
          },
          "b": {
            "x": 10,
            "y": -3
          }
        },
        {
          "id": "catalog-408",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 12
          },
          "b": {
            "x": 0,
            "y": 15
          }
        },
        {
          "id": "catalog-409",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -12
          },
          "b": {
            "x": 0,
            "y": -15
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 3
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": -3
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        },
        {
          "id": "TOP",
          "point": {
            "x": 0,
            "y": 15
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "BOT",
          "point": {
            "x": 0,
            "y": -15
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "D",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "pid-drum-horizontal",
      "name": "Horizontal drum / separator vessel",
      "library": "P&ID",
      "group": "Vessels & Tanks",
      "standard": "ISO 10628",
      "category": "P&ID / ISO 10628 / Vessels & Tanks",
      "entities": [
        {
          "id": "catalog-410",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -7,
            "y": 5
          },
          "b": {
            "x": 7,
            "y": 5
          }
        },
        {
          "id": "catalog-411",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -7,
            "y": -5
          },
          "b": {
            "x": 7,
            "y": -5
          }
        },
        {
          "id": "catalog-412",
          "layer": "0",
          "type": "arc",
          "center": {
            "x": -7,
            "y": 0
          },
          "radius": 5,
          "start": 90,
          "end": 270
        },
        {
          "id": "catalog-413",
          "layer": "0",
          "type": "arc",
          "center": {
            "x": 7,
            "y": 0
          },
          "radius": 5,
          "start": -90,
          "end": 90
        },
        {
          "id": "catalog-414",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -15,
            "y": 0
          },
          "b": {
            "x": -12,
            "y": 0
          }
        },
        {
          "id": "catalog-415",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 12,
            "y": 0
          },
          "b": {
            "x": 15,
            "y": 0
          }
        },
        {
          "id": "catalog-416",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -5,
            "y": -5
          },
          "b": {
            "x": -5,
            "y": -8
          }
        },
        {
          "id": "catalog-417",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 5,
            "y": -5
          },
          "b": {
            "x": 5,
            "y": -8
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -15,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 15,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "D",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "pid-ko-drum",
      "name": "Knock-out drum with demister pad",
      "library": "P&ID",
      "group": "Vessels & Tanks",
      "standard": "PIP / Industrial",
      "category": "P&ID / PIP / Industrial / Vessels & Tanks",
      "entities": [
        {
          "id": "catalog-418",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -5,
              "y": -7
            },
            {
              "x": -5,
              "y": 7
            }
          ],
          "closed": false
        },
        {
          "id": "catalog-419",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": 5,
              "y": -7
            },
            {
              "x": 5,
              "y": 7
            }
          ],
          "closed": false
        },
        {
          "id": "catalog-420",
          "layer": "0",
          "type": "arc",
          "center": {
            "x": 0,
            "y": 7
          },
          "radius": 5,
          "start": 0,
          "end": 180
        },
        {
          "id": "catalog-421",
          "layer": "0",
          "type": "arc",
          "center": {
            "x": 0,
            "y": -7
          },
          "radius": 5,
          "start": 180,
          "end": 360
        },
        {
          "id": "catalog-422",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -4.5,
              "y": 2.8
            },
            {
              "x": 4.5,
              "y": 2.8
            },
            {
              "x": 4.5,
              "y": 5.2
            },
            {
              "x": -4.5,
              "y": 5.2
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-423",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": -2
          },
          "b": {
            "x": -5,
            "y": -2
          }
        },
        {
          "id": "catalog-424",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 12
          },
          "b": {
            "x": 0,
            "y": 15
          }
        },
        {
          "id": "catalog-425",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -12
          },
          "b": {
            "x": 0,
            "y": -15
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": -2
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "VAP",
          "point": {
            "x": 0,
            "y": 15
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "LIQ",
          "point": {
            "x": 0,
            "y": -15
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "KO",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "pid-tank-cone-roof",
      "name": "Cone-roof atmospheric storage tank",
      "library": "P&ID",
      "group": "Vessels & Tanks",
      "standard": "ISO 10628",
      "category": "P&ID / ISO 10628 / Vessels & Tanks",
      "entities": [
        {
          "id": "catalog-426",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -8,
              "y": -8
            },
            {
              "x": -8,
              "y": 5
            },
            {
              "x": 0,
              "y": 10
            },
            {
              "x": 8,
              "y": 5
            },
            {
              "x": 8,
              "y": -8
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-427",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -12,
            "y": -5
          },
          "b": {
            "x": -8,
            "y": -5
          }
        },
        {
          "id": "catalog-428",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 8,
            "y": -5
          },
          "b": {
            "x": 12,
            "y": -5
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -12,
            "y": -5
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 12,
            "y": -5
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "TK",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "pid-tank-floating-roof",
      "name": "Floating-roof storage tank",
      "library": "P&ID",
      "group": "Vessels & Tanks",
      "standard": "ISO 10628",
      "category": "P&ID / ISO 10628 / Vessels & Tanks",
      "entities": [
        {
          "id": "catalog-429",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -8,
              "y": 8
            },
            {
              "x": -8,
              "y": -8
            },
            {
              "x": 8,
              "y": -8
            },
            {
              "x": 8,
              "y": 8
            }
          ],
          "closed": false
        },
        {
          "id": "catalog-430",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -7.5,
              "y": 3
            },
            {
              "x": 7.5,
              "y": 3
            },
            {
              "x": 7.5,
              "y": 4.5
            },
            {
              "x": -7.5,
              "y": 4.5
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-431",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -12,
            "y": -5
          },
          "b": {
            "x": -8,
            "y": -5
          }
        },
        {
          "id": "catalog-432",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 8,
            "y": -5
          },
          "b": {
            "x": 12,
            "y": -5
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -12,
            "y": -5
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 12,
            "y": -5
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "TK",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "pid-tank-sphere",
      "name": "Spherical pressure storage vessel (LPG)",
      "library": "P&ID",
      "group": "Vessels & Tanks",
      "standard": "ISO 10628",
      "category": "P&ID / ISO 10628 / Vessels & Tanks",
      "entities": [
        {
          "id": "catalog-433",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 1
          },
          "radius": 7
        },
        {
          "id": "catalog-434",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -6,
            "y": -3
          },
          "b": {
            "x": -6,
            "y": -9
          }
        },
        {
          "id": "catalog-435",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 6,
            "y": -3
          },
          "b": {
            "x": 6,
            "y": -9
          }
        },
        {
          "id": "catalog-436",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 1
          },
          "b": {
            "x": -7,
            "y": 1
          }
        },
        {
          "id": "catalog-437",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 7,
            "y": 1
          },
          "b": {
            "x": 10,
            "y": 1
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 1
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 1
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "TK",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "pid-silo-hopper",
      "name": "Solids storage silo / hopper",
      "library": "P&ID",
      "group": "Vessels & Tanks",
      "standard": "ISO 10628",
      "category": "P&ID / ISO 10628 / Vessels & Tanks",
      "entities": [
        {
          "id": "catalog-438",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -6,
              "y": 9
            },
            {
              "x": 6,
              "y": 9
            },
            {
              "x": 6,
              "y": 0
            },
            {
              "x": 1.5,
              "y": -9
            },
            {
              "x": -1.5,
              "y": -9
            },
            {
              "x": -6,
              "y": 0
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-439",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 9
          },
          "b": {
            "x": 0,
            "y": 12
          }
        },
        {
          "id": "catalog-440",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -9
          },
          "b": {
            "x": 0,
            "y": -12
          }
        }
      ],
      "ports": [
        {
          "id": "TOP",
          "point": {
            "x": 0,
            "y": 12
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "BOT",
          "point": {
            "x": 0,
            "y": -12
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "BN",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "pid-hx-shell-tube",
      "name": "Shell & tube heat exchanger (fixed tube)",
      "library": "P&ID",
      "group": "Heat Exchangers",
      "standard": "ISO 10628",
      "category": "P&ID / ISO 10628 / Heat Exchangers",
      "entities": [
        {
          "id": "catalog-441",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-442",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -8,
              "y": 0
            },
            {
              "x": -3,
              "y": 0
            },
            {
              "x": 0,
              "y": -3.5
            },
            {
              "x": 3,
              "y": 3.5
            },
            {
              "x": 8,
              "y": 0
            }
          ],
          "closed": false
        },
        {
          "id": "catalog-443",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -10
          },
          "b": {
            "x": 0,
            "y": -6
          }
        },
        {
          "id": "catalog-444",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 6
          },
          "b": {
            "x": 0,
            "y": 10
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -8,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 8,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        },
        {
          "id": "S1",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "S2",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "E",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "pid-hx-utube",
      "name": "U-tube heat exchanger (Horizontal)",
      "library": "P&ID",
      "group": "Heat Exchangers",
      "standard": "ISO 10628",
      "category": "P&ID / ISO 10628 / Heat Exchangers",
      "entities": [
        {
          "id": "catalog-445",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -8,
            "y": 4
          },
          "b": {
            "x": 8,
            "y": 4
          }
        },
        {
          "id": "catalog-446",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -8,
            "y": -4
          },
          "b": {
            "x": 8,
            "y": -4
          }
        },
        {
          "id": "catalog-447",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -8,
            "y": -4
          },
          "b": {
            "x": -8,
            "y": 4
          }
        },
        {
          "id": "catalog-448",
          "layer": "0",
          "type": "arc",
          "center": {
            "x": 8,
            "y": 0
          },
          "radius": 4,
          "start": -90,
          "end": 90
        },
        {
          "id": "catalog-449",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -10,
              "y": 2
            },
            {
              "x": 7,
              "y": 2
            }
          ],
          "closed": false
        },
        {
          "id": "catalog-450",
          "layer": "0",
          "type": "arc",
          "center": {
            "x": 7,
            "y": 0
          },
          "radius": 2,
          "start": -90,
          "end": 90
        },
        {
          "id": "catalog-451",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": 7,
              "y": -2
            },
            {
              "x": -10,
              "y": -2
            }
          ],
          "closed": false
        },
        {
          "id": "catalog-452",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -2,
            "y": 4
          },
          "b": {
            "x": -2,
            "y": 8
          }
        },
        {
          "id": "catalog-453",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 4,
            "y": -4
          },
          "b": {
            "x": 4,
            "y": -8
          }
        }
      ],
      "ports": [
        {
          "id": "TIN",
          "point": {
            "x": -10,
            "y": 2
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "TOUT",
          "point": {
            "x": -10,
            "y": -2
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "SIN",
          "point": {
            "x": -2,
            "y": 8
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "SOUT",
          "point": {
            "x": 4,
            "y": -8
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "E",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "pid-hx-kettle",
      "name": "Kettle reboiler",
      "library": "P&ID",
      "group": "Heat Exchangers",
      "standard": "PIP / Industrial",
      "category": "P&ID / PIP / Industrial / Heat Exchangers",
      "entities": [
        {
          "id": "catalog-454",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -8,
            "y": -4
          },
          "b": {
            "x": 7,
            "y": -4
          }
        },
        {
          "id": "catalog-455",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -8,
            "y": 3
          },
          "b": {
            "x": -2,
            "y": 3
          }
        },
        {
          "id": "catalog-456",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -2,
            "y": 3
          },
          "b": {
            "x": 0,
            "y": 6
          }
        },
        {
          "id": "catalog-457",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 6
          },
          "b": {
            "x": 7,
            "y": 6
          }
        },
        {
          "id": "catalog-458",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -8,
            "y": -4
          },
          "b": {
            "x": -8,
            "y": 3
          }
        },
        {
          "id": "catalog-459",
          "layer": "0",
          "type": "arc",
          "center": {
            "x": 7,
            "y": 1
          },
          "radius": 5,
          "start": -90,
          "end": 90
        },
        {
          "id": "catalog-460",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -11,
            "y": 1
          },
          "b": {
            "x": -3,
            "y": 1
          }
        },
        {
          "id": "catalog-461",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -11,
            "y": -1
          },
          "b": {
            "x": -3,
            "y": -1
          }
        },
        {
          "id": "catalog-462",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 3,
            "y": 6
          },
          "b": {
            "x": 3,
            "y": 10
          }
        },
        {
          "id": "catalog-463",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 5,
            "y": -4
          },
          "b": {
            "x": 5,
            "y": -8
          }
        }
      ],
      "ports": [
        {
          "id": "TIN",
          "point": {
            "x": -11,
            "y": 1
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "VAP",
          "point": {
            "x": 3,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "BOT",
          "point": {
            "x": 5,
            "y": -8
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "E",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "pid-hx-air-cooler",
      "name": "Fin-fan air-cooled heat exchanger",
      "library": "P&ID",
      "group": "Heat Exchangers",
      "standard": "Industrial",
      "category": "P&ID / Industrial / Heat Exchangers",
      "entities": [
        {
          "id": "catalog-464",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -9,
              "y": -4
            },
            {
              "x": 9,
              "y": -4
            },
            {
              "x": 9,
              "y": 4
            },
            {
              "x": -9,
              "y": 4
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-465",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -9,
              "y": 1.5
            },
            {
              "x": -4,
              "y": -1.5
            },
            {
              "x": 1,
              "y": 1.5
            },
            {
              "x": 6,
              "y": -1.5
            },
            {
              "x": 9,
              "y": 0.5
            }
          ],
          "closed": false
        },
        {
          "id": "catalog-466",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -5,
            "y": -8
          },
          "b": {
            "x": 5,
            "y": -8
          }
        },
        {
          "id": "catalog-467",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -8
          },
          "b": {
            "x": 0,
            "y": -5
          }
        },
        {
          "id": "catalog-468",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": -8
          },
          "radius": 1.5
        },
        {
          "id": "catalog-469",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -12,
            "y": 0
          },
          "b": {
            "x": -9,
            "y": 0
          }
        },
        {
          "id": "catalog-470",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 9,
            "y": 0
          },
          "b": {
            "x": 12,
            "y": 0
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -12,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 12,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "E",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "pid-hx-condenser",
      "name": "Surface condenser / vapor exchanger",
      "library": "P&ID",
      "group": "Heat Exchangers",
      "standard": "ISO 10628",
      "category": "P&ID / ISO 10628 / Heat Exchangers",
      "entities": [
        {
          "id": "catalog-471",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-472",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -6,
            "y": -3
          },
          "b": {
            "x": 6,
            "y": -3
          }
        },
        {
          "id": "catalog-473",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -6,
            "y": 3
          },
          "b": {
            "x": 6,
            "y": 3
          }
        },
        {
          "id": "catalog-474",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -10,
              "y": 0
            },
            {
              "x": -4,
              "y": 0
            },
            {
              "x": 4,
              "y": 0
            },
            {
              "x": 10,
              "y": 0
            }
          ],
          "closed": false
        },
        {
          "id": "catalog-475",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 6
          },
          "b": {
            "x": 0,
            "y": 10
          }
        },
        {
          "id": "catalog-476",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        },
        {
          "id": "VAP",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "COND",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "E",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "pid-cooling-tower",
      "name": "Cooling tower (hyperbolic / industrial)",
      "library": "P&ID",
      "group": "Heat Exchangers",
      "standard": "Industrial",
      "category": "P&ID / Industrial / Heat Exchangers",
      "entities": [
        {
          "id": "catalog-477",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -7,
              "y": -9
            },
            {
              "x": -4,
              "y": 0
            },
            {
              "x": -6,
              "y": 9
            },
            {
              "x": 6,
              "y": 9
            },
            {
              "x": 4,
              "y": 0
            },
            {
              "x": 7,
              "y": -9
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-478",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 4
          },
          "b": {
            "x": -5,
            "y": 4
          }
        },
        {
          "id": "catalog-479",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 7,
            "y": -6
          },
          "b": {
            "x": 10,
            "y": -6
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 4
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": -6
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "CT",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "pid-reducer-eccentric",
      "name": "Eccentric reducer (Riduzione eccentrica)",
      "library": "P&ID",
      "group": "Piping & Reducers",
      "standard": "ISO 14617",
      "category": "P&ID / ISO 14617 / Piping & Reducers",
      "entities": [
        {
          "id": "catalog-480",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -6,
              "y": -4
            },
            {
              "x": 6,
              "y": -4
            },
            {
              "x": 6,
              "y": 1
            },
            {
              "x": -6,
              "y": 4
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-481",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -6,
            "y": 0
          }
        },
        {
          "id": "catalog-482",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 6,
            "y": -1.5
          },
          "b": {
            "x": 10,
            "y": -1.5
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": -1.5
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "ER",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "pid-reducer-concentric-std",
      "name": "Concentric reducer boxed (PIP)",
      "library": "P&ID",
      "group": "Piping & Reducers",
      "standard": "PIP / Industrial",
      "category": "P&ID / PIP / Industrial / Piping & Reducers",
      "entities": [
        {
          "id": "catalog-483",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -6,
              "y": -4.5
            },
            {
              "x": 6,
              "y": -2
            },
            {
              "x": 6,
              "y": 2
            },
            {
              "x": -6,
              "y": 4.5
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-484",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -6,
            "y": 0
          }
        },
        {
          "id": "catalog-485",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 6,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "CR",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "pid-steam-ejector",
      "name": "Steam / vacuum ejector (Venturi nozzle)",
      "library": "P&ID",
      "group": "Piping & Reducers",
      "standard": "ISO 10628",
      "category": "P&ID / ISO 10628 / Piping & Reducers",
      "entities": [
        {
          "id": "catalog-486",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -6,
              "y": -4
            },
            {
              "x": 6,
              "y": -2.5
            },
            {
              "x": 6,
              "y": 2.5
            },
            {
              "x": -6,
              "y": 4
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-487",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -6,
              "y": -1.5
            },
            {
              "x": -1,
              "y": 0
            },
            {
              "x": -6,
              "y": 1.5
            }
          ],
          "closed": false
        },
        {
          "id": "catalog-488",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -6,
            "y": 0
          }
        },
        {
          "id": "catalog-489",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 6,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        },
        {
          "id": "catalog-490",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 3.2
          },
          "b": {
            "x": 0,
            "y": 9
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        },
        {
          "id": "SUC",
          "point": {
            "x": 0,
            "y": 9
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "EJ",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "pid-spectacle-blind",
      "name": "Spectacle blind (Figura a 8)",
      "library": "P&ID",
      "group": "Piping & Reducers",
      "standard": "Industrial",
      "category": "P&ID / Industrial / Piping & Reducers",
      "entities": [
        {
          "id": "catalog-491",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 3.5
          },
          "radius": 3
        },
        {
          "id": "catalog-492",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": -3.5
          },
          "radius": 3
        },
        {
          "id": "catalog-493",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -0.5
          },
          "b": {
            "x": 0,
            "y": 0.5
          }
        },
        {
          "id": "catalog-494",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": -3.5
          },
          "radius": 1.2
        },
        {
          "id": "catalog-495",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": -3,
            "y": 0
          }
        },
        {
          "id": "catalog-496",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 3,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        }
      ],
      "attributes": {
        "TAG": "SB",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "pid-tee-header",
      "name": "Piping Tee / branch connection",
      "library": "P&ID",
      "group": "Piping & Reducers",
      "standard": "Industrial",
      "category": "P&ID / Industrial / Piping & Reducers",
      "entities": [
        {
          "id": "catalog-497",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        },
        {
          "id": "catalog-498",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 0
          },
          "b": {
            "x": 0,
            "y": 10
          }
        },
        {
          "id": "catalog-499",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 1.5
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": -10,
            "y": 0
          },
          "direction": {
            "x": -1,
            "y": 0
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 10,
            "y": 0
          },
          "direction": {
            "x": 1,
            "y": 0
          }
        },
        {
          "id": "BR",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        }
      ],
      "attributes": {
        "TAG": "TEE",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "electric-fuse",
      "name": "Fuse",
      "library": "Electrical multi-line",
      "group": "Protection",
      "standard": "IEC 60617",
      "category": "Electrical multi-line / IEC 60617 / Protection",
      "entities": [
        {
          "id": "catalog-500",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -2,
              "y": -5
            },
            {
              "x": 2,
              "y": -5
            },
            {
              "x": 2,
              "y": 5
            },
            {
              "x": -2,
              "y": 5
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-501",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "F",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "electric-resistor",
      "name": "Resistor (IEC)",
      "library": "Electrical multi-line",
      "group": "Passive components and semiconductors",
      "standard": "IEC 60617",
      "category": "Electrical multi-line / IEC 60617 / Passive components and semiconductors",
      "entities": [
        {
          "id": "catalog-502",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -2,
              "y": -5
            },
            {
              "x": 2,
              "y": -5
            },
            {
              "x": 2,
              "y": 5
            },
            {
              "x": -2,
              "y": 5
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-503",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 5
          }
        },
        {
          "id": "catalog-504",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -5
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "R",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "electric-variable-resistor",
      "name": "Variable resistor",
      "library": "Electrical multi-line",
      "group": "Passive components and semiconductors",
      "standard": "IEC 60617",
      "category": "Electrical multi-line / IEC 60617 / Passive components and semiconductors",
      "entities": [
        {
          "id": "catalog-505",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -2,
              "y": -5
            },
            {
              "x": 2,
              "y": -5
            },
            {
              "x": 2,
              "y": 5
            },
            {
              "x": -2,
              "y": 5
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-506",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 5
          }
        },
        {
          "id": "catalog-507",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -5
          },
          "b": {
            "x": 0,
            "y": -10
          }
        },
        {
          "id": "catalog-508",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -5,
            "y": -6
          },
          "b": {
            "x": 5,
            "y": 6
          }
        },
        {
          "id": "catalog-509",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": 1,
              "y": 6
            },
            {
              "x": 5,
              "y": 6
            },
            {
              "x": 5,
              "y": 2
            }
          ],
          "closed": false
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "R",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "electric-capacitor",
      "name": "Capacitor",
      "library": "Electrical multi-line",
      "group": "Passive components and semiconductors",
      "standard": "IEC 60617",
      "category": "Electrical multi-line / IEC 60617 / Passive components and semiconductors",
      "entities": [
        {
          "id": "catalog-510",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -5,
            "y": 2
          },
          "b": {
            "x": 5,
            "y": 2
          }
        },
        {
          "id": "catalog-511",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -5,
            "y": -2
          },
          "b": {
            "x": 5,
            "y": -2
          }
        },
        {
          "id": "catalog-512",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 2
          }
        },
        {
          "id": "catalog-513",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -2
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "C",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "electric-inductor",
      "name": "Inductor",
      "library": "Electrical multi-line",
      "group": "Passive components and semiconductors",
      "standard": "IEC 60617",
      "category": "Electrical multi-line / IEC 60617 / Passive components and semiconductors",
      "entities": [
        {
          "id": "catalog-514",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 6
          }
        },
        {
          "id": "catalog-515",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": 0,
              "y": 6
            },
            {
              "x": 3,
              "y": 5
            },
            {
              "x": 0,
              "y": 4
            },
            {
              "x": 3,
              "y": 3
            },
            {
              "x": 0,
              "y": 2
            },
            {
              "x": 3,
              "y": 1
            },
            {
              "x": 0,
              "y": 0
            },
            {
              "x": 3,
              "y": -1
            },
            {
              "x": 0,
              "y": -2
            },
            {
              "x": 3,
              "y": -3
            },
            {
              "x": 0,
              "y": -4
            },
            {
              "x": 0,
              "y": -10
            }
          ],
          "closed": false
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "L",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "electric-diode",
      "name": "Diode",
      "library": "Electrical multi-line",
      "group": "Passive components and semiconductors",
      "standard": "IEC 60617",
      "category": "Electrical multi-line / IEC 60617 / Passive components and semiconductors",
      "entities": [
        {
          "id": "catalog-516",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -4,
              "y": 4
            },
            {
              "x": 4,
              "y": 4
            },
            {
              "x": 0,
              "y": -3
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-517",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -4,
            "y": -3
          },
          "b": {
            "x": 4,
            "y": -3
          }
        },
        {
          "id": "catalog-518",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 4
          }
        },
        {
          "id": "catalog-519",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -3
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "V",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "electric-lamp",
      "name": "Indicator lamp",
      "library": "Electrical multi-line",
      "group": "Measurement and indication",
      "standard": "IEC 60617",
      "category": "Electrical multi-line / IEC 60617 / Measurement and indication",
      "entities": [
        {
          "id": "catalog-520",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 5
        },
        {
          "id": "catalog-521",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -3.5,
            "y": -3.5
          },
          "b": {
            "x": 3.5,
            "y": 3.5
          }
        },
        {
          "id": "catalog-522",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -3.5,
            "y": 3.5
          },
          "b": {
            "x": 3.5,
            "y": -3.5
          }
        },
        {
          "id": "catalog-523",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 5
          }
        },
        {
          "id": "catalog-524",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -5
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "H",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "electric-buzzer",
      "name": "Audible indicator",
      "library": "Electrical multi-line",
      "group": "Measurement and indication",
      "standard": "IEC 60617",
      "category": "Electrical multi-line / IEC 60617 / Measurement and indication",
      "entities": [
        {
          "id": "catalog-525",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -4,
              "y": -4
            },
            {
              "x": 0,
              "y": -4
            },
            {
              "x": 5,
              "y": -7
            },
            {
              "x": 5,
              "y": 7
            },
            {
              "x": 0,
              "y": 4
            },
            {
              "x": -4,
              "y": 4
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-526",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 4
          }
        },
        {
          "id": "catalog-527",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -4
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "H",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "electric-ammeter",
      "name": "Ammeter",
      "library": "Electrical multi-line",
      "group": "Measurement and indication",
      "standard": "IEC 60617",
      "category": "Electrical multi-line / IEC 60617 / Measurement and indication",
      "entities": [
        {
          "id": "catalog-528",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-529",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -2,
            "y": -1
          },
          "text": "A",
          "height": 4,
          "rotation": 0
        },
        {
          "id": "catalog-530",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 6
          }
        },
        {
          "id": "catalog-531",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "PA",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "electric-voltmeter",
      "name": "Voltmeter",
      "library": "Electrical multi-line",
      "group": "Measurement and indication",
      "standard": "IEC 60617",
      "category": "Electrical multi-line / IEC 60617 / Measurement and indication",
      "entities": [
        {
          "id": "catalog-532",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-533",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -2,
            "y": -1
          },
          "text": "V",
          "height": 4,
          "rotation": 0
        },
        {
          "id": "catalog-534",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 6
          }
        },
        {
          "id": "catalog-535",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "PV",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "electric-wattmeter",
      "name": "Wattmeter",
      "library": "Electrical multi-line",
      "group": "Measurement and indication",
      "standard": "IEC 60617",
      "category": "Electrical multi-line / IEC 60617 / Measurement and indication",
      "entities": [
        {
          "id": "catalog-536",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-537",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -2,
            "y": -1
          },
          "text": "W",
          "height": 4,
          "rotation": 0
        },
        {
          "id": "catalog-538",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 6
          }
        },
        {
          "id": "catalog-539",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "PW",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "electric-kwh",
      "name": "Energy meter",
      "library": "Electrical multi-line",
      "group": "Measurement and indication",
      "standard": "IEC 60617",
      "category": "Electrical multi-line / IEC 60617 / Measurement and indication",
      "entities": [
        {
          "id": "catalog-540",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -6,
              "y": -6
            },
            {
              "x": 6,
              "y": -6
            },
            {
              "x": 6,
              "y": 6
            },
            {
              "x": -6,
              "y": 6
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-541",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -4,
            "y": -1
          },
          "text": "kWh",
          "height": 2.5,
          "rotation": 0
        },
        {
          "id": "catalog-542",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 6
          }
        },
        {
          "id": "catalog-543",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "PE",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "electric-push-no",
      "name": "Normally open pushbutton",
      "library": "Electrical multi-line",
      "group": "Control and automation",
      "standard": "IEC 60617",
      "category": "Electrical multi-line / IEC 60617 / Control and automation",
      "entities": [
        {
          "id": "catalog-544",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -4,
            "y": 2
          },
          "b": {
            "x": 4,
            "y": 2
          }
        },
        {
          "id": "catalog-545",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -4,
            "y": -2
          },
          "b": {
            "x": 4,
            "y": -2
          }
        },
        {
          "id": "catalog-546",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 2
          }
        },
        {
          "id": "catalog-547",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -2
          },
          "b": {
            "x": 0,
            "y": -10
          }
        },
        {
          "id": "catalog-548",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 4,
            "y": 0
          },
          "b": {
            "x": 8,
            "y": 0
          }
        },
        {
          "id": "catalog-549",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 8,
            "y": -3
          },
          "b": {
            "x": 8,
            "y": 3
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "S",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "electric-push-nc",
      "name": "Normally closed pushbutton",
      "library": "Electrical multi-line",
      "group": "Control and automation",
      "standard": "IEC 60617",
      "category": "Electrical multi-line / IEC 60617 / Control and automation",
      "entities": [
        {
          "id": "catalog-550",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -4,
            "y": 2
          },
          "b": {
            "x": 4,
            "y": 2
          }
        },
        {
          "id": "catalog-551",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -4,
            "y": -2
          },
          "b": {
            "x": 4,
            "y": -2
          }
        },
        {
          "id": "catalog-552",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 2
          }
        },
        {
          "id": "catalog-553",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -2
          },
          "b": {
            "x": 0,
            "y": -10
          }
        },
        {
          "id": "catalog-554",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -4,
            "y": -4
          },
          "b": {
            "x": 4,
            "y": 4
          }
        },
        {
          "id": "catalog-555",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 4,
            "y": 0
          },
          "b": {
            "x": 8,
            "y": 0
          }
        },
        {
          "id": "catalog-556",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 8,
            "y": -3
          },
          "b": {
            "x": 8,
            "y": 3
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "S",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "electric-emergency",
      "name": "Emergency stop",
      "library": "Electrical multi-line",
      "group": "Control and automation",
      "standard": "IEC 60617",
      "category": "Electrical multi-line / IEC 60617 / Control and automation",
      "entities": [
        {
          "id": "catalog-557",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -4,
            "y": 2
          },
          "b": {
            "x": 4,
            "y": 2
          }
        },
        {
          "id": "catalog-558",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -4,
            "y": -2
          },
          "b": {
            "x": 4,
            "y": -2
          }
        },
        {
          "id": "catalog-559",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 2
          }
        },
        {
          "id": "catalog-560",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -2
          },
          "b": {
            "x": 0,
            "y": -10
          }
        },
        {
          "id": "catalog-561",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -4,
            "y": -4
          },
          "b": {
            "x": 4,
            "y": 4
          }
        },
        {
          "id": "catalog-562",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 4,
            "y": 0
          },
          "b": {
            "x": 8,
            "y": 0
          }
        },
        {
          "id": "catalog-563",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": 8,
              "y": -4
            },
            {
              "x": 10,
              "y": -5
            },
            {
              "x": 10,
              "y": 5
            },
            {
              "x": 8,
              "y": 4
            }
          ],
          "closed": true
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "S",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "electric-limit",
      "name": "Limit switch",
      "library": "Electrical multi-line",
      "group": "Control and automation",
      "standard": "IEC 60617",
      "category": "Electrical multi-line / IEC 60617 / Control and automation",
      "entities": [
        {
          "id": "catalog-564",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 3
          }
        },
        {
          "id": "catalog-565",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -10
          },
          "b": {
            "x": 0,
            "y": -3
          }
        },
        {
          "id": "catalog-566",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -3
          },
          "b": {
            "x": 4,
            "y": 3
          }
        },
        {
          "id": "catalog-567",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 4,
            "y": 3
          },
          "b": {
            "x": 7,
            "y": 6
          }
        },
        {
          "id": "catalog-568",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 8,
            "y": 7
          },
          "radius": 1.5
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "S",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "electric-proximity",
      "name": "Proximity sensor",
      "library": "Electrical multi-line",
      "group": "Control and automation",
      "standard": "IEC 60617",
      "category": "Electrical multi-line / IEC 60617 / Control and automation",
      "entities": [
        {
          "id": "catalog-569",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -5,
              "y": -5
            },
            {
              "x": 5,
              "y": -5
            },
            {
              "x": 5,
              "y": 5
            },
            {
              "x": -5,
              "y": 5
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-570",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -3,
            "y": -1
          },
          "text": "→",
          "height": 3,
          "rotation": 0
        },
        {
          "id": "catalog-571",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 5
          }
        },
        {
          "id": "catalog-572",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -5
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "B",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "electric-relay",
      "name": "Auxiliary relay",
      "library": "Electrical multi-line",
      "group": "Control and automation",
      "standard": "IEC 60617",
      "category": "Electrical multi-line / IEC 60617 / Control and automation",
      "entities": [
        {
          "id": "catalog-573",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -5,
              "y": -4
            },
            {
              "x": 5,
              "y": -4
            },
            {
              "x": 5,
              "y": 4
            },
            {
              "x": -5,
              "y": 4
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-574",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -1,
            "y": -1
          },
          "text": "K",
          "height": 3,
          "rotation": 0
        },
        {
          "id": "catalog-575",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 4
          }
        },
        {
          "id": "catalog-576",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -4
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "K",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "electric-timer",
      "name": "Time-delay relay",
      "library": "Electrical multi-line",
      "group": "Control and automation",
      "standard": "IEC 60617",
      "category": "Electrical multi-line / IEC 60617 / Control and automation",
      "entities": [
        {
          "id": "catalog-577",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -5,
              "y": -4
            },
            {
              "x": 5,
              "y": -4
            },
            {
              "x": 5,
              "y": 4
            },
            {
              "x": -5,
              "y": 4
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-578",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -1,
            "y": -1
          },
          "text": "t",
          "height": 3,
          "rotation": 0
        },
        {
          "id": "catalog-579",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 4
          }
        },
        {
          "id": "catalog-580",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -4
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "KT",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "electric-spd",
      "name": "Surge protective device",
      "library": "Electrical multi-line",
      "group": "Protection",
      "standard": "IEC 60617",
      "category": "Electrical multi-line / IEC 60617 / Protection",
      "entities": [
        {
          "id": "catalog-581",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -4,
              "y": -6
            },
            {
              "x": 4,
              "y": -6
            },
            {
              "x": 4,
              "y": 6
            },
            {
              "x": -4,
              "y": 6
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-582",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": 2,
              "y": 5
            },
            {
              "x": -1,
              "y": 1
            },
            {
              "x": 2,
              "y": 1
            },
            {
              "x": -2,
              "y": -5
            }
          ],
          "closed": false
        },
        {
          "id": "catalog-583",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 6
          }
        },
        {
          "id": "catalog-584",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "F",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "electric-battery",
      "name": "Battery",
      "library": "Electrical multi-line",
      "group": "Power and connections",
      "standard": "IEC 60617",
      "category": "Electrical multi-line / IEC 60617 / Power and connections",
      "entities": [
        {
          "id": "catalog-585",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -5,
            "y": 3
          },
          "b": {
            "x": 5,
            "y": 3
          }
        },
        {
          "id": "catalog-586",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -3,
            "y": 0
          },
          "b": {
            "x": 3,
            "y": 0
          }
        },
        {
          "id": "catalog-587",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -5,
            "y": -3
          },
          "b": {
            "x": 5,
            "y": -3
          }
        },
        {
          "id": "catalog-588",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -3,
            "y": -6
          },
          "b": {
            "x": 3,
            "y": -6
          }
        },
        {
          "id": "catalog-589",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 3
          }
        },
        {
          "id": "catalog-590",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "G",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "electric-ac-source",
      "name": "AC source",
      "library": "Electrical multi-line",
      "group": "Power and connections",
      "standard": "IEC 60617",
      "category": "Electrical multi-line / IEC 60617 / Power and connections",
      "entities": [
        {
          "id": "catalog-591",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-592",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -4,
              "y": 0
            },
            {
              "x": -2,
              "y": 2
            },
            {
              "x": 0,
              "y": 0
            },
            {
              "x": 2,
              "y": -2
            },
            {
              "x": 4,
              "y": 0
            }
          ],
          "closed": false
        },
        {
          "id": "catalog-593",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 6
          }
        },
        {
          "id": "catalog-594",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "G",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "electric-dc-source",
      "name": "DC power supply",
      "library": "Electrical multi-line",
      "group": "Power and connections",
      "standard": "IEC 60617",
      "category": "Electrical multi-line / IEC 60617 / Power and connections",
      "entities": [
        {
          "id": "catalog-595",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -6,
              "y": -6
            },
            {
              "x": 6,
              "y": -6
            },
            {
              "x": 6,
              "y": 6
            },
            {
              "x": -6,
              "y": 6
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-596",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -2,
            "y": 2
          },
          "text": "+",
          "height": 3,
          "rotation": 0
        },
        {
          "id": "catalog-597",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -2,
            "y": -4
          },
          "text": "−",
          "height": 3,
          "rotation": 0
        },
        {
          "id": "catalog-598",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 6
          }
        },
        {
          "id": "catalog-599",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "G",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "electric-vfd",
      "name": "Drive / inverter",
      "library": "Electrical multi-line",
      "group": "Power and connections",
      "standard": "IEC 60617",
      "category": "Electrical multi-line / IEC 60617 / Power and connections",
      "entities": [
        {
          "id": "catalog-600",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -6,
              "y": -7
            },
            {
              "x": 6,
              "y": -7
            },
            {
              "x": 6,
              "y": 7
            },
            {
              "x": -6,
              "y": 7
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-601",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -6,
            "y": -7
          },
          "b": {
            "x": 6,
            "y": 7
          }
        },
        {
          "id": "catalog-602",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -4,
            "y": 2
          },
          "text": "~",
          "height": 3,
          "rotation": 0
        },
        {
          "id": "catalog-603",
          "layer": "0",
          "type": "text",
          "position": {
            "x": 1,
            "y": -5
          },
          "text": "~",
          "height": 3,
          "rotation": 0
        },
        {
          "id": "catalog-604",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 7
          }
        },
        {
          "id": "catalog-605",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -7
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "U",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "electric-generator",
      "name": "Generator",
      "library": "Electrical multi-line",
      "group": "Power and connections",
      "standard": "IEC 60617",
      "category": "Electrical multi-line / IEC 60617 / Power and connections",
      "entities": [
        {
          "id": "catalog-606",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-607",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -2,
            "y": -1
          },
          "text": "G",
          "height": 4,
          "rotation": 0
        },
        {
          "id": "catalog-608",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 6
          }
        },
        {
          "id": "catalog-609",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "G",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "electric-chassis",
      "name": "Chassis ground",
      "library": "Electrical multi-line",
      "group": "Power and connections",
      "standard": "IEC 60617",
      "category": "Electrical multi-line / IEC 60617 / Power and connections",
      "entities": [
        {
          "id": "catalog-610",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 0
          }
        },
        {
          "id": "catalog-611",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -6,
            "y": 0
          },
          "b": {
            "x": 6,
            "y": 0
          }
        },
        {
          "id": "catalog-612",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -6,
            "y": 0
          },
          "b": {
            "x": -3,
            "y": -4
          }
        },
        {
          "id": "catalog-613",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -2,
            "y": 0
          },
          "b": {
            "x": 1,
            "y": -4
          }
        },
        {
          "id": "catalog-614",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 2,
            "y": 0
          },
          "b": {
            "x": 5,
            "y": -4
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "PE",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "electric-junction",
      "name": "Conductor junction",
      "library": "Electrical multi-line",
      "group": "Power and connections",
      "standard": "IEC 60617",
      "category": "Electrical multi-line / IEC 60617 / Power and connections",
      "entities": [
        {
          "id": "catalog-615",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 0.8
        },
        {
          "id": "catalog-616",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        },
        {
          "id": "catalog-617",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -10
          },
          "b": {
            "x": 0,
            "y": 10
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "electric-crossing",
      "name": "Unconnected crossing",
      "library": "Electrical multi-line",
      "group": "Power and connections",
      "standard": "IEC 60617",
      "category": "Electrical multi-line / IEC 60617 / Power and connections",
      "entities": [
        {
          "id": "catalog-618",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        },
        {
          "id": "catalog-619",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -10
          },
          "b": {
            "x": 0,
            "y": -2
          }
        },
        {
          "id": "catalog-620",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": 0,
              "y": -2
            },
            {
              "x": 2,
              "y": 0
            },
            {
              "x": 0,
              "y": 2
            }
          ],
          "closed": false
        },
        {
          "id": "catalog-621",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 2
          },
          "b": {
            "x": 0,
            "y": 10
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "ansi-ansi-resistor",
      "name": "Resistor · zigzag (ANSI Y32)",
      "library": "Electrical multi-line",
      "group": "Passive components (ANSI Y32)",
      "standard": "ANSI Y32",
      "category": "Electrical multi-line / ANSI Y32 / Passive components (ANSI Y32)",
      "entities": [
        {
          "id": "catalog-622",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": 0,
              "y": 10
            },
            {
              "x": 0,
              "y": 6
            },
            {
              "x": 3,
              "y": 4.5
            },
            {
              "x": -3,
              "y": 2.5
            },
            {
              "x": 3,
              "y": 0.5
            },
            {
              "x": -3,
              "y": -1.5
            },
            {
              "x": 3,
              "y": -3.5
            },
            {
              "x": -3,
              "y": -5.5
            },
            {
              "x": 0,
              "y": -6.5
            },
            {
              "x": 0,
              "y": -10
            }
          ],
          "closed": false
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "R",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "ansi-ansi-capacitor",
      "name": "Capacitor · curved plate (ANSI Y32)",
      "library": "Electrical multi-line",
      "group": "Passive components (ANSI Y32)",
      "standard": "ANSI Y32",
      "category": "Electrical multi-line / ANSI Y32 / Passive components (ANSI Y32)",
      "entities": [
        {
          "id": "catalog-623",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -5,
            "y": 2
          },
          "b": {
            "x": 5,
            "y": 2
          }
        },
        {
          "id": "catalog-624",
          "layer": "0",
          "type": "arc",
          "center": {
            "x": 0,
            "y": -6
          },
          "radius": 6,
          "start": 50,
          "end": 130
        },
        {
          "id": "catalog-625",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 2
          }
        },
        {
          "id": "catalog-626",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -2
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "C",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "ansi-ansi-contact-no",
      "name": "Normally open contact · NEMA (ANSI Y32)",
      "library": "Electrical multi-line",
      "group": "Relays and contacts (ANSI Y32)",
      "standard": "ANSI Y32",
      "category": "Electrical multi-line / ANSI Y32 / Relays and contacts (ANSI Y32)",
      "entities": [
        {
          "id": "catalog-627",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 2.5
          }
        },
        {
          "id": "catalog-628",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -4,
            "y": 2.5
          },
          "b": {
            "x": 4,
            "y": 2.5
          }
        },
        {
          "id": "catalog-629",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -4,
            "y": -2.5
          },
          "b": {
            "x": 4,
            "y": -2.5
          }
        },
        {
          "id": "catalog-630",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -2.5
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "CR",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "ansi-ansi-contact-nc",
      "name": "Normally closed contact · NEMA (ANSI Y32)",
      "library": "Electrical multi-line",
      "group": "Relays and contacts (ANSI Y32)",
      "standard": "ANSI Y32",
      "category": "Electrical multi-line / ANSI Y32 / Relays and contacts (ANSI Y32)",
      "entities": [
        {
          "id": "catalog-631",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 2.5
          }
        },
        {
          "id": "catalog-632",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -4,
            "y": 2.5
          },
          "b": {
            "x": 4,
            "y": 2.5
          }
        },
        {
          "id": "catalog-633",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -4,
            "y": -2.5
          },
          "b": {
            "x": 4,
            "y": -2.5
          }
        },
        {
          "id": "catalog-634",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -5,
            "y": -4
          },
          "b": {
            "x": 5,
            "y": 4
          }
        },
        {
          "id": "catalog-635",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -2.5
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "CR",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "ansi-ansi-coil",
      "name": "Relay / contactor coil · circle (ANSI Y32)",
      "library": "Electrical multi-line",
      "group": "Relays and contacts (ANSI Y32)",
      "standard": "ANSI Y32",
      "category": "Electrical multi-line / ANSI Y32 / Relays and contacts (ANSI Y32)",
      "entities": [
        {
          "id": "catalog-636",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 5
        },
        {
          "id": "catalog-637",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -3,
            "y": -1
          },
          "text": "CR",
          "height": 2.8,
          "rotation": 0
        },
        {
          "id": "catalog-638",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 5
          }
        },
        {
          "id": "catalog-639",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -5
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "CR",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "ansi-ansi-breaker",
      "name": "Thermal-magnetic circuit breaker (ANSI Y32)",
      "library": "Electrical multi-line",
      "group": "Protection (ANSI Y32)",
      "standard": "ANSI Y32",
      "category": "Electrical multi-line / ANSI Y32 / Protection (ANSI Y32)",
      "entities": [
        {
          "id": "catalog-640",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 5
          }
        },
        {
          "id": "catalog-641",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 5
          },
          "radius": 0.8
        },
        {
          "id": "catalog-642",
          "layer": "0",
          "type": "arc",
          "center": {
            "x": -2,
            "y": 0
          },
          "radius": 5.4,
          "start": -65,
          "end": 65
        },
        {
          "id": "catalog-643",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": -5
          },
          "radius": 0.8
        },
        {
          "id": "catalog-644",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -5
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "CB",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "ansi-ansi-overload",
      "name": "Thermal overload heater (ANSI Y32)",
      "library": "Electrical multi-line",
      "group": "Protection (ANSI Y32)",
      "standard": "ANSI Y32",
      "category": "Electrical multi-line / ANSI Y32 / Protection (ANSI Y32)",
      "entities": [
        {
          "id": "catalog-645",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": 0,
              "y": 10
            },
            {
              "x": 0,
              "y": 5
            },
            {
              "x": -3,
              "y": 5
            },
            {
              "x": -3,
              "y": 1
            },
            {
              "x": 3,
              "y": 1
            },
            {
              "x": 3,
              "y": -3
            },
            {
              "x": 0,
              "y": -3
            },
            {
              "x": 0,
              "y": -10
            }
          ],
          "closed": false
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "OL",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "ansi-ansi-transformer",
      "name": "Control transformer · dual coil (ANSI Y32)",
      "library": "Electrical multi-line",
      "group": "Power and transformers (ANSI Y32)",
      "standard": "ANSI Y32",
      "category": "Electrical multi-line / ANSI Y32 / Power and transformers (ANSI Y32)",
      "entities": [
        {
          "id": "catalog-646",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -4,
            "y": 10
          },
          "b": {
            "x": -4,
            "y": 6
          }
        },
        {
          "id": "catalog-647",
          "layer": "0",
          "type": "arc",
          "center": {
            "x": -4,
            "y": 3
          },
          "radius": 3,
          "start": -90,
          "end": 90
        },
        {
          "id": "catalog-648",
          "layer": "0",
          "type": "arc",
          "center": {
            "x": -4,
            "y": -3
          },
          "radius": 3,
          "start": -90,
          "end": 90
        },
        {
          "id": "catalog-649",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -4,
            "y": -6
          },
          "b": {
            "x": -4,
            "y": -10
          }
        },
        {
          "id": "catalog-650",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -7
          },
          "b": {
            "x": 0,
            "y": 7
          }
        },
        {
          "id": "catalog-651",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 4,
            "y": 10
          },
          "b": {
            "x": 4,
            "y": 6
          }
        },
        {
          "id": "catalog-652",
          "layer": "0",
          "type": "arc",
          "center": {
            "x": 4,
            "y": 3
          },
          "radius": 3,
          "start": 90,
          "end": 270
        },
        {
          "id": "catalog-653",
          "layer": "0",
          "type": "arc",
          "center": {
            "x": 4,
            "y": -3
          },
          "radius": 3,
          "start": 90,
          "end": 270
        },
        {
          "id": "catalog-654",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 4,
            "y": -6
          },
          "b": {
            "x": 4,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "XFMR",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "nfpa-nfpa-estop",
      "name": "Mushroom E-Stop pushbutton (NFPA 79)",
      "library": "Electrical multi-line",
      "group": "Operator controls (NFPA 79)",
      "standard": "NFPA 79",
      "category": "Electrical multi-line / NFPA 79 / Operator controls (NFPA 79)",
      "entities": [
        {
          "id": "catalog-655",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 2
          }
        },
        {
          "id": "catalog-656",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -4,
            "y": 2
          },
          "b": {
            "x": 4,
            "y": 2
          }
        },
        {
          "id": "catalog-657",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -4,
            "y": -2
          },
          "b": {
            "x": 4,
            "y": -2
          }
        },
        {
          "id": "catalog-658",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -2
          },
          "b": {
            "x": 0,
            "y": -10
          }
        },
        {
          "id": "catalog-659",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 2
          },
          "b": {
            "x": 7,
            "y": 2
          }
        },
        {
          "id": "catalog-660",
          "layer": "0",
          "type": "arc",
          "center": {
            "x": 7,
            "y": 2
          },
          "radius": 4,
          "start": -90,
          "end": 90
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "PB",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "nfpa-nfpa-selector",
      "name": "Selector switch 3-position (NFPA 79)",
      "library": "Electrical multi-line",
      "group": "Operator controls (NFPA 79)",
      "standard": "NFPA 79",
      "category": "Electrical multi-line / NFPA 79 / Operator controls (NFPA 79)",
      "entities": [
        {
          "id": "catalog-661",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 3
          }
        },
        {
          "id": "catalog-662",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -4,
            "y": 3
          },
          "b": {
            "x": 4,
            "y": 3
          }
        },
        {
          "id": "catalog-663",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -4,
            "y": -3
          },
          "b": {
            "x": 4,
            "y": -3
          }
        },
        {
          "id": "catalog-664",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -3
          },
          "b": {
            "x": 0,
            "y": -10
          }
        },
        {
          "id": "catalog-665",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 0
          },
          "b": {
            "x": 7,
            "y": 0
          }
        },
        {
          "id": "catalog-666",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 7,
            "y": -3
          },
          "b": {
            "x": 9,
            "y": 0
          }
        },
        {
          "id": "catalog-667",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 7,
            "y": 3
          },
          "b": {
            "x": 9,
            "y": 0
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "SS",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "nfpa-nfpa-pressure-sw",
      "name": "Pressure switch NO (NFPA 79)",
      "library": "Electrical multi-line",
      "group": "Process sensors and switches (NFPA 79)",
      "standard": "NFPA 79",
      "category": "Electrical multi-line / NFPA 79 / Process sensors and switches (NFPA 79)",
      "entities": [
        {
          "id": "catalog-668",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 4
          }
        },
        {
          "id": "catalog-669",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -10
          },
          "b": {
            "x": 0,
            "y": -4
          }
        },
        {
          "id": "catalog-670",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -4
          },
          "b": {
            "x": 3,
            "y": 4
          }
        },
        {
          "id": "catalog-671",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 2,
            "y": 0
          },
          "b": {
            "x": 6,
            "y": 0
          }
        },
        {
          "id": "catalog-672",
          "layer": "0",
          "type": "arc",
          "center": {
            "x": 6,
            "y": 0
          },
          "radius": 3,
          "start": -90,
          "end": 90
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "PS",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "nfpa-nfpa-float-sw",
      "name": "Liquid level float switch (NFPA 79)",
      "library": "Electrical multi-line",
      "group": "Process sensors and switches (NFPA 79)",
      "standard": "NFPA 79",
      "category": "Electrical multi-line / NFPA 79 / Process sensors and switches (NFPA 79)",
      "entities": [
        {
          "id": "catalog-673",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 4
          }
        },
        {
          "id": "catalog-674",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -10
          },
          "b": {
            "x": 0,
            "y": -4
          }
        },
        {
          "id": "catalog-675",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -4
          },
          "b": {
            "x": 3,
            "y": 4
          }
        },
        {
          "id": "catalog-676",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 2,
            "y": 0
          },
          "b": {
            "x": 6,
            "y": 0
          }
        },
        {
          "id": "catalog-677",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 8,
            "y": 0
          },
          "radius": 2.2
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "LS",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "nfpa-nfpa-photo-sensor",
      "name": "Photoelectric sensor (NFPA 79)",
      "library": "Electrical multi-line",
      "group": "Process sensors and switches (NFPA 79)",
      "standard": "NFPA 79",
      "category": "Electrical multi-line / NFPA 79 / Process sensors and switches (NFPA 79)",
      "entities": [
        {
          "id": "catalog-678",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -5,
              "y": -5
            },
            {
              "x": 5,
              "y": -5
            },
            {
              "x": 5,
              "y": 5
            },
            {
              "x": -5,
              "y": 5
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-679",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -3,
              "y": 0
            },
            {
              "x": 0,
              "y": 3
            },
            {
              "x": 3,
              "y": 0
            },
            {
              "x": 0,
              "y": -3
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-680",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -2.5,
            "y": -1
          },
          "text": "PE",
          "height": 2.2,
          "rotation": 0
        },
        {
          "id": "catalog-681",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 5
          }
        },
        {
          "id": "catalog-682",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -5
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "PE",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "nfpa-nfpa-plc-in",
      "name": "PLC Digital Input module (NFPA 79)",
      "library": "Electrical multi-line",
      "group": "PLC and drives (NFPA 79)",
      "standard": "NFPA 79",
      "category": "Electrical multi-line / NFPA 79 / PLC and drives (NFPA 79)",
      "entities": [
        {
          "id": "catalog-683",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -7,
              "y": -6
            },
            {
              "x": 7,
              "y": -6
            },
            {
              "x": 7,
              "y": 6
            },
            {
              "x": -7,
              "y": 6
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-684",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -7,
            "y": 2
          },
          "b": {
            "x": 7,
            "y": 2
          }
        },
        {
          "id": "catalog-685",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -5,
            "y": 3
          },
          "text": "PLC DI",
          "height": 2,
          "rotation": 0
        },
        {
          "id": "catalog-686",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -3.5,
            "y": -2
          },
          "text": "I0.0",
          "height": 2.2,
          "rotation": 0
        },
        {
          "id": "catalog-687",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 6
          }
        },
        {
          "id": "catalog-688",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "PLC",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "nfpa-nfpa-plc-out",
      "name": "PLC Digital Output module (NFPA 79)",
      "library": "Electrical multi-line",
      "group": "PLC and drives (NFPA 79)",
      "standard": "NFPA 79",
      "category": "Electrical multi-line / NFPA 79 / PLC and drives (NFPA 79)",
      "entities": [
        {
          "id": "catalog-689",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -7,
              "y": -6
            },
            {
              "x": 7,
              "y": -6
            },
            {
              "x": 7,
              "y": 6
            },
            {
              "x": -7,
              "y": 6
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-690",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -7,
            "y": 2
          },
          "b": {
            "x": 7,
            "y": 2
          }
        },
        {
          "id": "catalog-691",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -5,
            "y": 3
          },
          "text": "PLC DO",
          "height": 2,
          "rotation": 0
        },
        {
          "id": "catalog-692",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -3.5,
            "y": -2
          },
          "text": "Q0.0",
          "height": 2.2,
          "rotation": 0
        },
        {
          "id": "catalog-693",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 6
          }
        },
        {
          "id": "catalog-694",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "PLC",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "nfpa-nfpa-solenoid",
      "name": "Solenoid actuator coil (NFPA 79)",
      "library": "Electrical multi-line",
      "group": "PLC and drives (NFPA 79)",
      "standard": "NFPA 79",
      "category": "Electrical multi-line / NFPA 79 / PLC and drives (NFPA 79)",
      "entities": [
        {
          "id": "catalog-695",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -4,
              "y": 3
            },
            {
              "x": 4,
              "y": 3
            },
            {
              "x": -4,
              "y": -3
            },
            {
              "x": 4,
              "y": -3
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-696",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 3
          }
        },
        {
          "id": "catalog-697",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -3
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "SOL",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "single-breaker-1",
      "name": "Circuit breaker 1P · single-line",
      "library": "Electrical single-line",
      "group": "Switching and protection",
      "standard": "IEC 60617",
      "category": "Electrical single-line / IEC 60617 / Switching and protection",
      "entities": [
        {
          "id": "catalog-698",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 4
          }
        },
        {
          "id": "catalog-699",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -10
          },
          "b": {
            "x": 0,
            "y": -4
          }
        },
        {
          "id": "catalog-700",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -4
          },
          "b": {
            "x": 4,
            "y": 4
          }
        },
        {
          "id": "catalog-701",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -2,
              "y": -3
            },
            {
              "x": 2,
              "y": -3
            },
            {
              "x": 2,
              "y": 3
            },
            {
              "x": -2,
              "y": 3
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-702",
          "layer": "0",
          "type": "text",
          "position": {
            "x": 5,
            "y": 0
          },
          "text": "1P",
          "height": 2.5,
          "rotation": 0
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "Q",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "single-cable-1",
      "name": "Cable · 1 conductors",
      "library": "Electrical single-line",
      "group": "Distribution",
      "standard": "IEC 60617",
      "category": "Electrical single-line / IEC 60617 / Distribution",
      "entities": [
        {
          "id": "catalog-703",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": -10
          }
        },
        {
          "id": "catalog-704",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -2,
            "y": 4
          },
          "b": {
            "x": 2,
            "y": 6
          }
        },
        {
          "id": "catalog-705",
          "layer": "0",
          "type": "text",
          "position": {
            "x": 5,
            "y": -1
          },
          "text": "1",
          "height": 3,
          "rotation": 0
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "W",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "single-breaker-2",
      "name": "Circuit breaker 2P · single-line",
      "library": "Electrical single-line",
      "group": "Switching and protection",
      "standard": "IEC 60617",
      "category": "Electrical single-line / IEC 60617 / Switching and protection",
      "entities": [
        {
          "id": "catalog-706",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 4
          }
        },
        {
          "id": "catalog-707",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -10
          },
          "b": {
            "x": 0,
            "y": -4
          }
        },
        {
          "id": "catalog-708",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -4
          },
          "b": {
            "x": 4,
            "y": 4
          }
        },
        {
          "id": "catalog-709",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -2,
              "y": -3
            },
            {
              "x": 2,
              "y": -3
            },
            {
              "x": 2,
              "y": 3
            },
            {
              "x": -2,
              "y": 3
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-710",
          "layer": "0",
          "type": "text",
          "position": {
            "x": 5,
            "y": 0
          },
          "text": "2P",
          "height": 2.5,
          "rotation": 0
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "Q",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "single-cable-2",
      "name": "Cable · 2 conductors",
      "library": "Electrical single-line",
      "group": "Distribution",
      "standard": "IEC 60617",
      "category": "Electrical single-line / IEC 60617 / Distribution",
      "entities": [
        {
          "id": "catalog-711",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": -10
          }
        },
        {
          "id": "catalog-712",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -2,
            "y": 4
          },
          "b": {
            "x": 2,
            "y": 6
          }
        },
        {
          "id": "catalog-713",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -2,
            "y": 1
          },
          "b": {
            "x": 2,
            "y": 3
          }
        },
        {
          "id": "catalog-714",
          "layer": "0",
          "type": "text",
          "position": {
            "x": 5,
            "y": -1
          },
          "text": "2",
          "height": 3,
          "rotation": 0
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "W",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "single-breaker-3",
      "name": "Circuit breaker 3P · single-line",
      "library": "Electrical single-line",
      "group": "Switching and protection",
      "standard": "IEC 60617",
      "category": "Electrical single-line / IEC 60617 / Switching and protection",
      "entities": [
        {
          "id": "catalog-715",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 4
          }
        },
        {
          "id": "catalog-716",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -10
          },
          "b": {
            "x": 0,
            "y": -4
          }
        },
        {
          "id": "catalog-717",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -4
          },
          "b": {
            "x": 4,
            "y": 4
          }
        },
        {
          "id": "catalog-718",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -2,
              "y": -3
            },
            {
              "x": 2,
              "y": -3
            },
            {
              "x": 2,
              "y": 3
            },
            {
              "x": -2,
              "y": 3
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-719",
          "layer": "0",
          "type": "text",
          "position": {
            "x": 5,
            "y": 0
          },
          "text": "3P",
          "height": 2.5,
          "rotation": 0
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "Q",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "single-cable-3",
      "name": "Cable · 3 conductors",
      "library": "Electrical single-line",
      "group": "Distribution",
      "standard": "IEC 60617",
      "category": "Electrical single-line / IEC 60617 / Distribution",
      "entities": [
        {
          "id": "catalog-720",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": -10
          }
        },
        {
          "id": "catalog-721",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -2,
            "y": 4
          },
          "b": {
            "x": 2,
            "y": 6
          }
        },
        {
          "id": "catalog-722",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -2,
            "y": 1
          },
          "b": {
            "x": 2,
            "y": 3
          }
        },
        {
          "id": "catalog-723",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -2,
            "y": -2
          },
          "b": {
            "x": 2,
            "y": 0
          }
        },
        {
          "id": "catalog-724",
          "layer": "0",
          "type": "text",
          "position": {
            "x": 5,
            "y": -1
          },
          "text": "3",
          "height": 3,
          "rotation": 0
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "W",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "single-breaker-4",
      "name": "Circuit breaker 4P · single-line",
      "library": "Electrical single-line",
      "group": "Switching and protection",
      "standard": "IEC 60617",
      "category": "Electrical single-line / IEC 60617 / Switching and protection",
      "entities": [
        {
          "id": "catalog-725",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 4
          }
        },
        {
          "id": "catalog-726",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -10
          },
          "b": {
            "x": 0,
            "y": -4
          }
        },
        {
          "id": "catalog-727",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -4
          },
          "b": {
            "x": 4,
            "y": 4
          }
        },
        {
          "id": "catalog-728",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -2,
              "y": -3
            },
            {
              "x": 2,
              "y": -3
            },
            {
              "x": 2,
              "y": 3
            },
            {
              "x": -2,
              "y": 3
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-729",
          "layer": "0",
          "type": "text",
          "position": {
            "x": 5,
            "y": 0
          },
          "text": "4P",
          "height": 2.5,
          "rotation": 0
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "Q",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "single-cable-4",
      "name": "Cable · 4 conductors",
      "library": "Electrical single-line",
      "group": "Distribution",
      "standard": "IEC 60617",
      "category": "Electrical single-line / IEC 60617 / Distribution",
      "entities": [
        {
          "id": "catalog-730",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": -10
          }
        },
        {
          "id": "catalog-731",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -2,
            "y": 4
          },
          "b": {
            "x": 2,
            "y": 6
          }
        },
        {
          "id": "catalog-732",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -2,
            "y": 1
          },
          "b": {
            "x": 2,
            "y": 3
          }
        },
        {
          "id": "catalog-733",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -2,
            "y": -2
          },
          "b": {
            "x": 2,
            "y": 0
          }
        },
        {
          "id": "catalog-734",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -2,
            "y": -5
          },
          "b": {
            "x": 2,
            "y": -3
          }
        },
        {
          "id": "catalog-735",
          "layer": "0",
          "type": "text",
          "position": {
            "x": 5,
            "y": -1
          },
          "text": "4",
          "height": 3,
          "rotation": 0
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "W",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "single-busbar",
      "name": "Busbar",
      "library": "Electrical single-line",
      "group": "Distribution and conversion",
      "standard": "IEC 60617",
      "category": "Electrical single-line / IEC 60617 / Distribution and conversion",
      "entities": [
        {
          "id": "catalog-736",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        },
        {
          "id": "catalog-737",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 1
          },
          "b": {
            "x": 10,
            "y": 1
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "B",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "single-transformer",
      "name": "Transformer · single-line",
      "library": "Electrical single-line",
      "group": "Distribution and conversion",
      "standard": "IEC 60617",
      "category": "Electrical single-line / IEC 60617 / Distribution and conversion",
      "entities": [
        {
          "id": "catalog-738",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 3
          },
          "radius": 4
        },
        {
          "id": "catalog-739",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": -3
          },
          "radius": 4
        },
        {
          "id": "catalog-740",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 7
          }
        },
        {
          "id": "catalog-741",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -7
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "T",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "single-ct",
      "name": "Current transformer CT",
      "library": "Electrical single-line",
      "group": "Distribution and conversion",
      "standard": "IEC 60617",
      "category": "Electrical single-line / IEC 60617 / Distribution and conversion",
      "entities": [
        {
          "id": "catalog-742",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": -10
          }
        },
        {
          "id": "catalog-743",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 4
        },
        {
          "id": "catalog-744",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 4,
            "y": 0
          },
          "b": {
            "x": 8,
            "y": 0
          }
        },
        {
          "id": "catalog-745",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": 5,
              "y": 2
            },
            {
              "x": 8,
              "y": 0
            },
            {
              "x": 5,
              "y": -2
            }
          ],
          "closed": false
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "TA",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "single-vt",
      "name": "Voltage transformer VT",
      "library": "Electrical single-line",
      "group": "Distribution and conversion",
      "standard": "IEC 60617",
      "category": "Electrical single-line / IEC 60617 / Distribution and conversion",
      "entities": [
        {
          "id": "catalog-746",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 3
          },
          "radius": 4
        },
        {
          "id": "catalog-747",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": -3
          },
          "radius": 4
        },
        {
          "id": "catalog-748",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 7
          }
        },
        {
          "id": "catalog-749",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -7
          },
          "b": {
            "x": 0,
            "y": -10
          }
        },
        {
          "id": "catalog-750",
          "layer": "0",
          "type": "text",
          "position": {
            "x": 6,
            "y": -1
          },
          "text": "V",
          "height": 3,
          "rotation": 0
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "TV",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "single-motor",
      "name": "Three-phase motor · single-line",
      "library": "Electrical single-line",
      "group": "Distribution and conversion",
      "standard": "IEC 60617",
      "category": "Electrical single-line / IEC 60617 / Distribution and conversion",
      "entities": [
        {
          "id": "catalog-751",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-752",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -2,
            "y": 0
          },
          "text": "M",
          "height": 4,
          "rotation": 0
        },
        {
          "id": "catalog-753",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -2,
            "y": -4
          },
          "text": "3~",
          "height": 2,
          "rotation": 0
        },
        {
          "id": "catalog-754",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 6
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "M",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "single-load",
      "name": "Generic load",
      "library": "Electrical single-line",
      "group": "Distribution and conversion",
      "standard": "IEC 60617",
      "category": "Electrical single-line / IEC 60617 / Distribution and conversion",
      "entities": [
        {
          "id": "catalog-755",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -5,
              "y": 4
            },
            {
              "x": 5,
              "y": 4
            },
            {
              "x": 0,
              "y": -5
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-756",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 4
          }
        },
        {
          "id": "catalog-757",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -5
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "U",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "single-ups",
      "name": "UPS",
      "library": "Electrical single-line",
      "group": "Distribution and conversion",
      "standard": "IEC 60617",
      "category": "Electrical single-line / IEC 60617 / Distribution and conversion",
      "entities": [
        {
          "id": "catalog-758",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -6,
              "y": -7
            },
            {
              "x": 6,
              "y": -7
            },
            {
              "x": 6,
              "y": 7
            },
            {
              "x": -6,
              "y": 7
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-759",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -4,
            "y": -1
          },
          "text": "UPS",
          "height": 2.5,
          "rotation": 0
        },
        {
          "id": "catalog-760",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 7
          }
        },
        {
          "id": "catalog-761",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -7
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "U",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "single-pv",
      "name": "Photovoltaic generator",
      "library": "Electrical single-line",
      "group": "Distribution and conversion",
      "standard": "IEC 60617",
      "category": "Electrical single-line / IEC 60617 / Distribution and conversion",
      "entities": [
        {
          "id": "catalog-762",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -6,
              "y": -6
            },
            {
              "x": 6,
              "y": -6
            },
            {
              "x": 6,
              "y": 6
            },
            {
              "x": -6,
              "y": 6
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-763",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -6,
            "y": 0
          },
          "b": {
            "x": 6,
            "y": 0
          }
        },
        {
          "id": "catalog-764",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": 6
          }
        },
        {
          "id": "catalog-765",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -10,
              "y": 10
            },
            {
              "x": -6,
              "y": 6
            },
            {
              "x": -9,
              "y": 6
            }
          ],
          "closed": false
        },
        {
          "id": "catalog-766",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 6
          }
        },
        {
          "id": "catalog-767",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -6
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "G",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "single-earth-switch",
      "name": "Earthing switch",
      "library": "Electrical single-line",
      "group": "Switching and protection",
      "standard": "IEC 60617",
      "category": "Electrical single-line / IEC 60617 / Switching and protection",
      "entities": [
        {
          "id": "catalog-768",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 4
          }
        },
        {
          "id": "catalog-769",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -4
          },
          "b": {
            "x": 4,
            "y": 4
          }
        },
        {
          "id": "catalog-770",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -4
          },
          "b": {
            "x": 0,
            "y": -7
          }
        },
        {
          "id": "catalog-771",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -4,
            "y": -7
          },
          "b": {
            "x": 4,
            "y": -7
          }
        },
        {
          "id": "catalog-772",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -2,
            "y": -9
          },
          "b": {
            "x": 2,
            "y": -9
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "QE",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "single-rcd",
      "name": "RCD · single-line",
      "library": "Electrical single-line",
      "group": "Switching and protection",
      "standard": "IEC 60617",
      "category": "Electrical single-line / IEC 60617 / Switching and protection",
      "entities": [
        {
          "id": "catalog-773",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -4,
              "y": -5
            },
            {
              "x": 4,
              "y": -5
            },
            {
              "x": 4,
              "y": 5
            },
            {
              "x": -4,
              "y": 5
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-774",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": -10
          }
        },
        {
          "id": "catalog-775",
          "layer": "0",
          "type": "text",
          "position": {
            "x": 6,
            "y": 0
          },
          "text": "ΔI",
          "height": 2.5,
          "rotation": 0
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "Q",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "single-ansi-cb-1l",
      "name": "Drawout circuit breaker · single-line (ANSI Y32)",
      "library": "Electrical single-line",
      "group": "Switching and protection",
      "standard": "ANSI Y32",
      "category": "Electrical single-line / ANSI Y32 / Switching and protection",
      "entities": [
        {
          "id": "catalog-776",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 5
          }
        },
        {
          "id": "catalog-777",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -2,
              "y": 6
            },
            {
              "x": 0,
              "y": 4
            },
            {
              "x": 2,
              "y": 6
            }
          ],
          "closed": false
        },
        {
          "id": "catalog-778",
          "layer": "0",
          "type": "arc",
          "center": {
            "x": -2,
            "y": 0
          },
          "radius": 5.2,
          "start": -65,
          "end": 65
        },
        {
          "id": "catalog-779",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -2,
              "y": -6
            },
            {
              "x": 0,
              "y": -4
            },
            {
              "x": 2,
              "y": -6
            }
          ],
          "closed": false
        },
        {
          "id": "catalog-780",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -5
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "52",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "single-nfpa-disconnect-1l",
      "name": "Main machine disconnect switch (NFPA 79)",
      "library": "Electrical single-line",
      "group": "Switching and protection",
      "standard": "NFPA 79",
      "category": "Electrical single-line / NFPA 79 / Switching and protection",
      "entities": [
        {
          "id": "catalog-781",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 4
          }
        },
        {
          "id": "catalog-782",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -10
          },
          "b": {
            "x": 0,
            "y": -4
          }
        },
        {
          "id": "catalog-783",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -4
          },
          "b": {
            "x": 5,
            "y": 4
          }
        },
        {
          "id": "catalog-784",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -4,
            "y": 0
          },
          "b": {
            "x": 6,
            "y": 0
          }
        },
        {
          "id": "catalog-785",
          "layer": "0",
          "type": "text",
          "position": {
            "x": 5,
            "y": -2
          },
          "text": "DISC",
          "height": 2,
          "rotation": 0
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "DS",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "single-iec62271-cb-withdrawable",
      "name": "MV Withdrawable circuit breaker truck (IEC 62271-1)",
      "library": "Electrical single-line",
      "group": "Switching and protection",
      "standard": "IEC 62271-1",
      "category": "Electrical single-line / IEC 62271-1 / Switching and protection",
      "entities": [
        {
          "id": "catalog-786",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 7
          }
        },
        {
          "id": "catalog-787",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -2.5,
              "y": 8.5
            },
            {
              "x": 0,
              "y": 6.2
            },
            {
              "x": 2.5,
              "y": 8.5
            }
          ],
          "closed": false
        },
        {
          "id": "catalog-788",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -2.5,
              "y": 6.5
            },
            {
              "x": 0,
              "y": 4.2
            },
            {
              "x": 2.5,
              "y": 6.5
            }
          ],
          "closed": false
        },
        {
          "id": "catalog-789",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -3,
            "y": -3
          },
          "b": {
            "x": 3,
            "y": 3
          }
        },
        {
          "id": "catalog-790",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -3,
            "y": 3
          },
          "b": {
            "x": 3,
            "y": -3
          }
        },
        {
          "id": "catalog-791",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 4.2
          },
          "b": {
            "x": 0,
            "y": -4.2
          }
        },
        {
          "id": "catalog-792",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -2.5,
              "y": -6.5
            },
            {
              "x": 0,
              "y": -4.2
            },
            {
              "x": 2.5,
              "y": -6.5
            }
          ],
          "closed": false
        },
        {
          "id": "catalog-793",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -2.5,
              "y": -8.5
            },
            {
              "x": 0,
              "y": -6.2
            },
            {
              "x": 2.5,
              "y": -8.5
            }
          ],
          "closed": false
        },
        {
          "id": "catalog-794",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -7
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "CB",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "single-iec62271-disconnector",
      "name": "HV Disconnector / Isolator (IEC 62271-1)",
      "library": "Electrical single-line",
      "group": "Switching and protection",
      "standard": "IEC 62271-1",
      "category": "Electrical single-line / IEC 62271-1 / Switching and protection",
      "entities": [
        {
          "id": "catalog-795",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 4
          }
        },
        {
          "id": "catalog-796",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -3,
            "y": 4
          },
          "b": {
            "x": 3,
            "y": 4
          }
        },
        {
          "id": "catalog-797",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -4
          },
          "b": {
            "x": 4.5,
            "y": 3.5
          }
        },
        {
          "id": "catalog-798",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -4
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "QS",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "single-iec62271-load-switch",
      "name": "Switch-disconnector / Load-break switch (IEC 62271-1)",
      "library": "Electrical single-line",
      "group": "Switching and protection",
      "standard": "IEC 62271-1",
      "category": "Electrical single-line / IEC 62271-1 / Switching and protection",
      "entities": [
        {
          "id": "catalog-799",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 4
          }
        },
        {
          "id": "catalog-800",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 4
          },
          "radius": 1.5
        },
        {
          "id": "catalog-801",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -4
          },
          "b": {
            "x": 5,
            "y": 3.5
          }
        },
        {
          "id": "catalog-802",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -4
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "QB",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "single-iec62271-fuse-switch",
      "name": "Fuse-switch-disconnector (IEC 62271-1)",
      "library": "Electrical single-line",
      "group": "Switching and protection",
      "standard": "IEC 62271-1",
      "category": "Electrical single-line / IEC 62271-1 / Switching and protection",
      "entities": [
        {
          "id": "catalog-803",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 4
          }
        },
        {
          "id": "catalog-804",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 4
          },
          "radius": 1.4
        },
        {
          "id": "catalog-805",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -4
          },
          "b": {
            "x": 4.5,
            "y": 3.5
          }
        },
        {
          "id": "catalog-806",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -1.5,
              "y": -6
            },
            {
              "x": 1.5,
              "y": -6
            },
            {
              "x": 1.5,
              "y": -1
            },
            {
              "x": -1.5,
              "y": -1
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-807",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -4
          },
          "b": {
            "x": 0,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "QSF",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "single-iec62271-make-earth",
      "name": "Make-proof earthing switch (IEC 62271-1)",
      "library": "Electrical single-line",
      "group": "Switching and protection",
      "standard": "IEC 62271-1",
      "category": "Electrical single-line / IEC 62271-1 / Switching and protection",
      "entities": [
        {
          "id": "catalog-808",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 4
          }
        },
        {
          "id": "catalog-809",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -3
          },
          "b": {
            "x": 4,
            "y": 4
          }
        },
        {
          "id": "catalog-810",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 4
          },
          "radius": 1.3
        },
        {
          "id": "catalog-811",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -3
          },
          "b": {
            "x": 0,
            "y": -7
          }
        },
        {
          "id": "catalog-812",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -4.5,
            "y": -7
          },
          "b": {
            "x": 4.5,
            "y": -7
          }
        },
        {
          "id": "catalog-813",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -2.5,
            "y": -8.8
          },
          "b": {
            "x": 2.5,
            "y": -8.8
          }
        },
        {
          "id": "catalog-814",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -1,
            "y": -10
          },
          "b": {
            "x": 1,
            "y": -10
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "QE",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "single-iec62271-surge-arrester",
      "name": "Metal-oxide surge arrester (IEC 62271-1)",
      "library": "Electrical single-line",
      "group": "Switching and protection",
      "standard": "IEC 62271-1",
      "category": "Electrical single-line / IEC 62271-1 / Switching and protection",
      "entities": [
        {
          "id": "catalog-815",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 4
          }
        },
        {
          "id": "catalog-816",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -2.5,
              "y": 4
            },
            {
              "x": 2.5,
              "y": 4
            },
            {
              "x": 2.5,
              "y": -4
            },
            {
              "x": -2.5,
              "y": -4
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-817",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 3
          },
          "b": {
            "x": 0,
            "y": -3
          }
        },
        {
          "id": "catalog-818",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -1.5,
              "y": -1
            },
            {
              "x": 0,
              "y": -3
            },
            {
              "x": 1.5,
              "y": -1
            }
          ],
          "closed": false
        },
        {
          "id": "catalog-819",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -4
          },
          "b": {
            "x": 0,
            "y": -7
          }
        },
        {
          "id": "catalog-820",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -4,
            "y": -7
          },
          "b": {
            "x": 4,
            "y": -7
          }
        },
        {
          "id": "catalog-821",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -2,
            "y": -9
          },
          "b": {
            "x": 2,
            "y": -9
          }
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "F",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "single-iec62271-200-cubicle",
      "name": "Metal-enclosed switchgear bay LSC2B (IEC/EN 62271-200)",
      "library": "Electrical single-line",
      "group": "Switching and protection",
      "standard": "IEC/EN 62271-200",
      "category": "Electrical single-line / IEC/EN 62271-200 / Switching and protection",
      "entities": [
        {
          "id": "catalog-822",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -8,
              "y": -9
            },
            {
              "x": 8,
              "y": -9
            },
            {
              "x": 8,
              "y": 9
            },
            {
              "x": -8,
              "y": 9
            }
          ],
          "closed": true
        },
        {
          "id": "catalog-823",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -8,
            "y": 4.5
          },
          "b": {
            "x": 8,
            "y": 4.5
          }
        },
        {
          "id": "catalog-824",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -8,
            "y": -3.5
          },
          "b": {
            "x": 8,
            "y": -3.5
          }
        },
        {
          "id": "catalog-825",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": 4.5
          }
        },
        {
          "id": "catalog-826",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -3,
            "y": -2
          },
          "b": {
            "x": 3,
            "y": 2.5
          }
        },
        {
          "id": "catalog-827",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -3,
            "y": 2.5
          },
          "b": {
            "x": 3,
            "y": -2
          }
        },
        {
          "id": "catalog-828",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 4.5
          },
          "b": {
            "x": 0,
            "y": -3.5
          }
        },
        {
          "id": "catalog-829",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -3.5
          },
          "b": {
            "x": 0,
            "y": -10
          }
        },
        {
          "id": "catalog-830",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": -6
          },
          "radius": 2
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "PANEL",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "single-iec62271-200-cable-vds",
      "name": "Cable compartment with CT & VDS indicator (IEC/EN 62271-200)",
      "library": "Electrical single-line",
      "group": "Switching and protection",
      "standard": "IEC/EN 62271-200",
      "category": "Electrical single-line / IEC/EN 62271-200 / Switching and protection",
      "entities": [
        {
          "id": "catalog-831",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": 10
          },
          "b": {
            "x": 0,
            "y": -10
          }
        },
        {
          "id": "catalog-832",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 3
          },
          "radius": 3.2
        },
        {
          "id": "catalog-833",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 3.2,
            "y": 3
          },
          "b": {
            "x": 7,
            "y": 3
          }
        },
        {
          "id": "catalog-834",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -2
          },
          "b": {
            "x": 5,
            "y": -2
          }
        },
        {
          "id": "catalog-835",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 5,
            "y": -5
          },
          "b": {
            "x": 5,
            "y": 1
          }
        },
        {
          "id": "catalog-836",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 7,
            "y": -3.5
          },
          "b": {
            "x": 7,
            "y": -0.5
          }
        },
        {
          "id": "catalog-837",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -2,
              "y": -7
            },
            {
              "x": 2,
              "y": -7
            },
            {
              "x": 0,
              "y": -9.5
            }
          ],
          "closed": true
        }
      ],
      "ports": [
        {
          "id": "IN",
          "point": {
            "x": 0,
            "y": 10
          },
          "direction": {
            "x": 0,
            "y": 1
          }
        },
        {
          "id": "OUT",
          "point": {
            "x": 0,
            "y": -10
          },
          "direction": {
            "x": 0,
            "y": -1
          }
        }
      ],
      "attributes": {
        "TAG": "VDS",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "general-arrow",
      "name": "Arrow",
      "library": "General",
      "group": "Annotation and shapes",
      "standard": "ISO 128",
      "category": "General / ISO 128 / Annotation and shapes",
      "entities": [
        {
          "id": "catalog-838",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -10,
            "y": 0
          },
          "b": {
            "x": 10,
            "y": 0
          }
        },
        {
          "id": "catalog-839",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": 5,
              "y": 4
            },
            {
              "x": 10,
              "y": 0
            },
            {
              "x": 5,
              "y": -4
            }
          ],
          "closed": false
        }
      ],
      "ports": [],
      "attributes": {
        "TAG": "",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "general-origin",
      "name": "Origin marker",
      "library": "General",
      "group": "Annotation and shapes",
      "standard": "ISO 128",
      "category": "General / ISO 128 / Annotation and shapes",
      "entities": [
        {
          "id": "catalog-840",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 4
        },
        {
          "id": "catalog-841",
          "layer": "0",
          "type": "line",
          "a": {
            "x": -8,
            "y": 0
          },
          "b": {
            "x": 8,
            "y": 0
          }
        },
        {
          "id": "catalog-842",
          "layer": "0",
          "type": "line",
          "a": {
            "x": 0,
            "y": -8
          },
          "b": {
            "x": 0,
            "y": 8
          }
        }
      ],
      "ports": [],
      "attributes": {
        "TAG": "",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "general-terminal",
      "name": "Circular reference",
      "library": "General",
      "group": "Annotation and shapes",
      "standard": "ISO 128",
      "category": "General / ISO 128 / Annotation and shapes",
      "entities": [
        {
          "id": "catalog-843",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 5
        }
      ],
      "ports": [],
      "attributes": {
        "TAG": "",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "general-frame",
      "name": "Generic frame",
      "library": "General",
      "group": "Annotation and shapes",
      "standard": "ISO 128",
      "category": "General / ISO 128 / Annotation and shapes",
      "entities": [
        {
          "id": "catalog-844",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": -10,
              "y": -7
            },
            {
              "x": 10,
              "y": -7
            },
            {
              "x": 10,
              "y": 7
            },
            {
              "x": -10,
              "y": 7
            }
          ],
          "closed": true
        }
      ],
      "ports": [],
      "attributes": {
        "TAG": "",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "general-diamond",
      "name": "Decision / diamond",
      "library": "General",
      "group": "Annotation and shapes",
      "standard": "ISO 128",
      "category": "General / ISO 128 / Annotation and shapes",
      "entities": [
        {
          "id": "catalog-845",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": 0,
              "y": 8
            },
            {
              "x": 8,
              "y": 0
            },
            {
              "x": 0,
              "y": -8
            },
            {
              "x": -8,
              "y": 0
            }
          ],
          "closed": true
        }
      ],
      "ports": [],
      "attributes": {
        "TAG": "",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    },
    {
      "id": "general-triangle",
      "name": "Triangle",
      "library": "General",
      "group": "Annotation and shapes",
      "standard": "ISO 128",
      "category": "General / ISO 128 / Annotation and shapes",
      "entities": [
        {
          "id": "catalog-846",
          "layer": "0",
          "type": "polyline",
          "points": [
            {
              "x": 0,
              "y": 8
            },
            {
              "x": 8,
              "y": -6
            },
            {
              "x": -8,
              "y": -6
            }
          ],
          "closed": true
        }
      ],
      "ports": [],
      "attributes": {
        "TAG": "",
        "VALUE": "",
        "DESCRIPTION": "",
        "NOTES": ""
      }
    }
  ],
  "entities": [
    {
      "id": "tk101",
      "type": "insert",
      "layer": "0",
      "block": "pid-tank",
      "position": {
        "x": -135,
        "y": 15
      },
      "rotation": 0,
      "scale": {
        "x": 1.5,
        "y": 1.5
      },
      "attributes": {
        "TAG": "TK-101",
        "VALUE": "2500 L",
        "BRAND": "AlfaTank",
        "MODEL": "V25-SS316",
        "DESCRIPTION": "Buffer Feed Tank"
      }
    },
    {
      "id": "hv101",
      "type": "insert",
      "layer": "0",
      "block": "pid-isolation",
      "position": {
        "x": -95,
        "y": 15
      },
      "rotation": 0,
      "scale": {
        "x": 1,
        "y": 1
      },
      "attributes": {
        "TAG": "HV-101",
        "VALUE": "DN80",
        "BRAND": "KSB",
        "MODEL": "BOA-H",
        "DESCRIPTION": "Suction Gate Valve"
      }
    },
    {
      "id": "p101a",
      "type": "insert",
      "layer": "0",
      "block": "pid-pump",
      "position": {
        "x": -50,
        "y": 15
      },
      "rotation": 0,
      "scale": {
        "x": 1.2,
        "y": 1.2
      },
      "attributes": {
        "TAG": "P-101A",
        "VALUE": "11 kW",
        "BRAND": "Grundfos",
        "MODEL": "CRN 32-4",
        "DESCRIPTION": "Centrifugal Cooling Pump"
      }
    },
    {
      "id": "nrv101",
      "type": "insert",
      "layer": "0",
      "block": "pid-check",
      "position": {
        "x": -10,
        "y": 15
      },
      "rotation": 0,
      "scale": {
        "x": 1,
        "y": 1
      },
      "attributes": {
        "TAG": "NRV-101",
        "VALUE": "DN80",
        "BRAND": "ARI-Armaturen",
        "MODEL": "Checko-V",
        "DESCRIPTION": "Swing Check Valve"
      }
    },
    {
      "id": "fv101",
      "type": "insert",
      "layer": "0",
      "block": "pid-control",
      "position": {
        "x": 40,
        "y": 15
      },
      "rotation": 0,
      "scale": {
        "x": 1,
        "y": 1
      },
      "attributes": {
        "TAG": "FV-101",
        "VALUE": "DN65 Cv40",
        "BRAND": "Samson",
        "MODEL": "3241-7",
        "DESCRIPTION": "Pneumatic Flow Control Valve"
      }
    },
    {
      "id": "e101",
      "type": "insert",
      "layer": "0",
      "block": "pid-exchanger",
      "position": {
        "x": 95,
        "y": 15
      },
      "rotation": 0,
      "scale": {
        "x": 1.3,
        "y": 1.3
      },
      "attributes": {
        "TAG": "E-101",
        "VALUE": "120 kW",
        "BRAND": "Alfa Laval",
        "MODEL": "M10-BFG",
        "DESCRIPTION": "Plate Heat Exchanger"
      }
    },
    {
      "id": "hv102",
      "type": "insert",
      "layer": "0",
      "block": "pid-isolation",
      "position": {
        "x": 140,
        "y": 15
      },
      "rotation": 0,
      "scale": {
        "x": 1,
        "y": 1
      },
      "attributes": {
        "TAG": "HV-102",
        "VALUE": "DN80",
        "BRAND": "KSB",
        "MODEL": "BOA-H",
        "DESCRIPTION": "Outlet Isolation Valve"
      }
    },
    {
      "id": "pt101",
      "type": "insert",
      "layer": "SIGNALS",
      "block": "pid-PT",
      "position": {
        "x": -28,
        "y": 50
      },
      "rotation": 0,
      "scale": {
        "x": 1,
        "y": 1
      },
      "attributes": {
        "TAG": "PT-101",
        "VALUE": "0..16 bar",
        "BRAND": "Endress+Hauser",
        "MODEL": "PMP51",
        "DESCRIPTION": "Discharge Pressure Transmitter"
      }
    },
    {
      "id": "fic101",
      "type": "insert",
      "layer": "SIGNALS",
      "block": "pid-panel",
      "position": {
        "x": 40,
        "y": 60
      },
      "rotation": 0,
      "scale": {
        "x": 1,
        "y": 1
      },
      "attributes": {
        "TAG": "FIC-101",
        "VALUE": "4-20 mA",
        "BRAND": "Siemens",
        "MODEL": "PCS7-AI",
        "DESCRIPTION": "DCS Flow Controller"
      }
    },
    {
      "id": "tt101",
      "type": "insert",
      "layer": "SIGNALS",
      "block": "pid-TT",
      "position": {
        "x": 120,
        "y": 50
      },
      "rotation": 0,
      "scale": {
        "x": 1,
        "y": 1
      },
      "attributes": {
        "TAG": "TT-101",
        "VALUE": "-10..90 °C",
        "BRAND": "Endress+Hauser",
        "MODEL": "TMT82",
        "DESCRIPTION": "Supply Temperature Transmitter"
      }
    },
    {
      "id": "w1",
      "type": "wire",
      "layer": "PIPES",
      "points": [
        {
          "x": -120,
          "y": 15
        },
        {
          "x": -115,
          "y": 15
        },
        {
          "x": -112.5,
          "y": 15
        },
        {
          "x": -110,
          "y": 15
        },
        {
          "x": -105,
          "y": 15
        }
      ],
      "from": {
        "insertId": "tk101",
        "portId": "OUT"
      },
      "to": {
        "insertId": "hv101",
        "portId": "IN"
      },
      "discipline": "piping",
      "serviceTag": "CW-101",
      "pipeSpec": "DN80-PN16"
    },
    {
      "id": "w2",
      "type": "wire",
      "layer": "PIPES",
      "points": [
        {
          "x": -85,
          "y": 15
        },
        {
          "x": -80,
          "y": 15
        },
        {
          "x": -73.5,
          "y": 15
        },
        {
          "x": -67,
          "y": 15
        },
        {
          "x": -62,
          "y": 15
        }
      ],
      "from": {
        "insertId": "hv101",
        "portId": "OUT"
      },
      "to": {
        "insertId": "p101a",
        "portId": "IN"
      },
      "arrows": {
        "style": "closed",
        "placement": "middle"
      },
      "discipline": "piping",
      "serviceTag": "CW-102",
      "pipeSpec": "DN80-PN16"
    },
    {
      "id": "w3",
      "type": "wire",
      "layer": "PIPES",
      "points": [
        {
          "x": -38,
          "y": 15
        },
        {
          "x": -33,
          "y": 15
        },
        {
          "x": -29,
          "y": 15
        },
        {
          "x": -25,
          "y": 15
        },
        {
          "x": -20,
          "y": 15
        }
      ],
      "from": {
        "insertId": "p101a",
        "portId": "OUT"
      },
      "to": {
        "insertId": "nrv101",
        "portId": "IN"
      },
      "discipline": "piping"
    },
    {
      "id": "w4",
      "type": "wire",
      "layer": "PIPES",
      "points": [
        {
          "x": 0,
          "y": 15
        },
        {
          "x": 5,
          "y": 15
        },
        {
          "x": 15,
          "y": 15
        },
        {
          "x": 25,
          "y": 15
        },
        {
          "x": 30,
          "y": 15
        }
      ],
      "from": {
        "insertId": "nrv101",
        "portId": "OUT"
      },
      "to": {
        "insertId": "fv101",
        "portId": "IN"
      },
      "arrows": {
        "style": "closed",
        "placement": "middle"
      },
      "discipline": "piping",
      "serviceTag": "CW-103",
      "pipeSpec": "DN65-PN16"
    },
    {
      "id": "w5",
      "type": "wire",
      "layer": "PIPES",
      "points": [
        {
          "x": 50,
          "y": 15
        },
        {
          "x": 55,
          "y": 15
        },
        {
          "x": 66,
          "y": 15
        },
        {
          "x": 77,
          "y": 15
        },
        {
          "x": 82,
          "y": 15
        }
      ],
      "from": {
        "insertId": "fv101",
        "portId": "OUT"
      },
      "to": {
        "insertId": "e101",
        "portId": "IN"
      },
      "arrows": {
        "style": "closed",
        "placement": "middle"
      },
      "discipline": "piping"
    },
    {
      "id": "w6",
      "type": "wire",
      "layer": "PIPES",
      "points": [
        {
          "x": 108,
          "y": 15
        },
        {
          "x": 113,
          "y": 15
        },
        {
          "x": 119,
          "y": 15
        },
        {
          "x": 125,
          "y": 15
        },
        {
          "x": 130,
          "y": 15
        }
      ],
      "from": {
        "insertId": "e101",
        "portId": "OUT"
      },
      "to": {
        "insertId": "hv102",
        "portId": "IN"
      },
      "arrows": {
        "style": "closed",
        "placement": "middle"
      },
      "discipline": "piping",
      "serviceTag": "CW-104",
      "pipeSpec": "DN80-PN16"
    },
    {
      "id": "bypass",
      "type": "polyline",
      "layer": "PIPES",
      "closed": false,
      "points": [
        {
          "x": 15,
          "y": 15
        },
        {
          "x": 15,
          "y": -15
        },
        {
          "x": 65,
          "y": -15
        },
        {
          "x": 65,
          "y": 15
        }
      ],
      "arrows": {
        "style": "stealth",
        "placement": "middle"
      },
      "discipline": "piping",
      "pipeSpec": "BYPASS DN50"
    },
    {
      "id": "sig-pt",
      "type": "line",
      "layer": "SIGNALS",
      "a": {
        "x": -28,
        "y": 15
      },
      "b": {
        "x": -28,
        "y": 40
      }
    },
    {
      "id": "sig-fic",
      "type": "line",
      "layer": "SIGNALS",
      "a": {
        "x": 40,
        "y": 50
      },
      "b": {
        "x": 40,
        "y": 25
      },
      "arrows": {
        "style": "open",
        "placement": "end"
      }
    },
    {
      "id": "sig-tt",
      "type": "line",
      "layer": "SIGNALS",
      "a": {
        "x": 120,
        "y": 15
      },
      "b": {
        "x": 120,
        "y": 40
      }
    },
    {
      "id": "sig-bus",
      "type": "line",
      "layer": "SIGNALS",
      "a": {
        "x": -40,
        "y": 34
      },
      "b": {
        "x": 135,
        "y": 34
      },
      "lineType": "DASHED"
    },
    {
      "id": "title-note",
      "type": "text",
      "layer": "0",
      "position": {
        "x": -135,
        "y": 80
      },
      "height": 5,
      "rotation": 0,
      "text": "PRIMARY CHILLED WATER SKID (DN80)"
    },
    {
      "id": "dim-skid",
      "type": "dimension",
      "layer": "0",
      "kind": "horizontal",
      "a": {
        "x": -135,
        "y": -32
      },
      "b": {
        "x": 140,
        "y": -32
      },
      "offset": -12
    },
    {
      "id": "dim-bypass",
      "type": "dimension",
      "layer": "0",
      "kind": "horizontal",
      "a": {
        "x": 15,
        "y": -15
      },
      "b": {
        "x": 65,
        "y": -15
      },
      "offset": -10
    }
  ],
  "projectSettings": {
    "defaultTextHeight": 3,
    "defaultLabelAnchor": "default",
    "defaultLabelOrientation": "horizontal",
    "defaultLabelScaleWithBlock": false,
    "lineJumps": true,
    "jumpRadius": 2.5,
    "jumpPriority": "horizontal",
    "jumpScope": "all",
    "dynamicPortConnectors": true,
    "connectorRoutingMode": "straight_to_polyline"
  },
  "sheet": {
    "enabled": true,
    "titleBlockMode": "real",
    "titleBlockStandard": "ISO-7200",
    "size": "A3",
    "orientation": "landscape",
    "scale": "1:1",
    "autoScaleInserts": false,
    "marginMm": 10,
    "center": {
      "x": 0,
      "y": 0
    },
    "titleBlock": {
      "project": "Cooling Water Skid CW-01",
      "title": "Primary Cooling Pump & Control Loop — P&ID",
      "drawingNumber": "PID-CW-101",
      "revision": "A",
      "scale": "1:1",
      "units": "mm",
      "standard": "ISA-5.1 / ISO 10628",
      "author": "Alessandro Abrami",
      "date": "2026-11-21",
      "company": "CAD-Lab Engineering",
      "sheet": "1 / 1",
      "notes": "Main process header DN80 PN16"
    }
  }
}
```
