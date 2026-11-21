---
obsidian-cad: true
tags: ["cad","FV-101","P-101"]
cad-component-tags: ["FV-101","P-101"]
cad-units: "mm"
---
# P&ID Example

Pump P-101 and control valve FV-101 connected via ports.

<!-- cad-bom:start -->
## Bill of Materials (BOM)

> Auto-generated unidirectionally from the CAD schematic. Manual edits to this table do not modify the drawing.

| # | Tag | Component / Symbol | Standard | Category | Value / Rating | Description | Attributes | Layer | Notes |
| :-: | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | FV-101 | Control valve | ANSI/ISA-5.1 | Valves and actuators | DN25 | - | - | 0 | - |
| 2 | P-101 | Centrifugal pump | ISO 10628 | Equipment | 4 kW | Water | - | 0 | - |
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
      "name": "Transmitter PT",
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
          "type": "text",
          "position": {
            "x": -3,
            "y": 0
          },
          "text": "PT",
          "height": 3,
          "rotation": 0
        },
        {
          "id": "symbol-41",
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
      "name": "Transmitter TT",
      "category": "P&ID / ANSI/ISA-5.1 / Instruments and transmitters",
      "entities": [
        {
          "id": "symbol-42",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "symbol-43",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -3,
            "y": 0
          },
          "text": "TT",
          "height": 3,
          "rotation": 0
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
      "name": "Transmitter FT",
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
          "type": "text",
          "position": {
            "x": -3,
            "y": 0
          },
          "text": "FT",
          "height": 3,
          "rotation": 0
        },
        {
          "id": "symbol-47",
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
      "name": "Transmitter LT",
      "category": "P&ID / ANSI/ISA-5.1 / Instruments and transmitters",
      "entities": [
        {
          "id": "symbol-48",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "symbol-49",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -3,
            "y": 0
          },
          "text": "LT",
          "height": 3,
          "rotation": 0
        },
        {
          "id": "symbol-50",
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
          "id": "symbol-51",
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
          "id": "symbol-52",
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
          "id": "symbol-53",
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
          "id": "symbol-54",
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
          "id": "symbol-55",
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
          "id": "symbol-56",
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
          "id": "symbol-57",
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
          "id": "symbol-58",
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
          "id": "symbol-59",
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
          "id": "symbol-60",
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
          "id": "symbol-61",
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
          "id": "symbol-62",
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
          "id": "symbol-63",
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
          "id": "symbol-64",
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
          "id": "symbol-65",
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
          "id": "symbol-66",
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
          "id": "symbol-67",
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
          "id": "symbol-68",
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
          "id": "symbol-69",
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
          "id": "symbol-70",
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
          "id": "symbol-71",
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
          "id": "symbol-72",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 7
          },
          "radius": 2
        },
        {
          "id": "symbol-73",
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
          "id": "symbol-74",
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
          "id": "symbol-75",
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
          "id": "symbol-76",
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
          "id": "symbol-77",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 4
          },
          "radius": 0.6
        },
        {
          "id": "symbol-78",
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
          "id": "symbol-79",
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
          "id": "symbol-80",
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
          "id": "symbol-81",
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
          "id": "symbol-86",
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
          "id": "symbol-87",
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
          "id": "symbol-88",
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
          "id": "symbol-89",
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
          "id": "symbol-90",
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
          "id": "symbol-91",
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
          "id": "symbol-92",
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
          "id": "symbol-93",
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
          "id": "symbol-94",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 7
        },
        {
          "id": "symbol-95",
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
          "id": "symbol-96",
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
          "id": "symbol-97",
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
          "id": "symbol-98",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 3
          },
          "radius": 4
        },
        {
          "id": "symbol-99",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": -3
          },
          "radius": 4
        },
        {
          "id": "symbol-100",
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
          "id": "symbol-101",
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
          "id": "symbol-102",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 2
        },
        {
          "id": "symbol-103",
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
          "id": "symbol-104",
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
          "id": "symbol-105",
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
          "id": "symbol-106",
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
          "id": "symbol-107",
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
          "id": "symbol-108",
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
          "type": "text",
          "position": {
            "x": -1.7,
            "y": 0
          },
          "text": "PI",
          "height": 2.4,
          "rotation": 0
        },
        {
          "id": "catalog-69",
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
          "id": "catalog-70",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-71",
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
          "id": "catalog-72",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -1.7,
            "y": 1
          },
          "text": "PI",
          "height": 2.4,
          "rotation": 0
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
          "type": "text",
          "position": {
            "x": -1.7,
            "y": 0
          },
          "text": "TI",
          "height": 2.4,
          "rotation": 0
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
      "id": "isa-TI-panel",
      "name": "Temperature indicator · panel",
      "library": "P&ID",
      "group": "Panel instruments",
      "standard": "ANSI/ISA-5.1",
      "category": "P&ID / ANSI/ISA-5.1 / Panel instruments",
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
            "x": -6,
            "y": 0
          },
          "b": {
            "x": 6,
            "y": 0
          }
        },
        {
          "id": "catalog-79",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -1.7,
            "y": 1
          },
          "text": "TI",
          "height": 2.4,
          "rotation": 0
        },
        {
          "id": "catalog-80",
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
          "id": "catalog-81",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-82",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -1.7,
            "y": 0
          },
          "text": "FI",
          "height": 2.4,
          "rotation": 0
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
          "type": "text",
          "position": {
            "x": -1.7,
            "y": 1
          },
          "text": "FI",
          "height": 2.4,
          "rotation": 0
        },
        {
          "id": "catalog-87",
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
          "id": "catalog-88",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-89",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -1.7,
            "y": 0
          },
          "text": "LI",
          "height": 2.4,
          "rotation": 0
        },
        {
          "id": "catalog-90",
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
          "id": "catalog-91",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-92",
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
          "id": "catalog-93",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -1.7,
            "y": 1
          },
          "text": "LI",
          "height": 2.4,
          "rotation": 0
        },
        {
          "id": "catalog-94",
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
          "id": "catalog-95",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-96",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -2.55,
            "y": 0
          },
          "text": "PIC",
          "height": 2.4,
          "rotation": 0
        },
        {
          "id": "catalog-97",
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
          "id": "catalog-98",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-99",
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
          "id": "catalog-100",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -2.55,
            "y": 1
          },
          "text": "PIC",
          "height": 2.4,
          "rotation": 0
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
          "type": "text",
          "position": {
            "x": -2.55,
            "y": 0
          },
          "text": "TIC",
          "height": 2.4,
          "rotation": 0
        },
        {
          "id": "catalog-104",
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
          "id": "catalog-105",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-106",
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
          "id": "catalog-107",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -2.55,
            "y": 1
          },
          "text": "TIC",
          "height": 2.4,
          "rotation": 0
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
          "type": "text",
          "position": {
            "x": -2.55,
            "y": 0
          },
          "text": "FIC",
          "height": 2.4,
          "rotation": 0
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
            "x": -6,
            "y": 0
          },
          "b": {
            "x": 6,
            "y": 0
          }
        },
        {
          "id": "catalog-114",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -2.55,
            "y": 1
          },
          "text": "FIC",
          "height": 2.4,
          "rotation": 0
        },
        {
          "id": "catalog-115",
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
          "id": "catalog-116",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-117",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -2.55,
            "y": 0
          },
          "text": "LIC",
          "height": 2.4,
          "rotation": 0
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
          "type": "text",
          "position": {
            "x": -2.55,
            "y": 1
          },
          "text": "LIC",
          "height": 2.4,
          "rotation": 0
        },
        {
          "id": "catalog-122",
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
          "id": "catalog-123",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-124",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -2.55,
            "y": 0
          },
          "text": "PSH",
          "height": 2.4,
          "rotation": 0
        },
        {
          "id": "catalog-125",
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
          "id": "catalog-126",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-127",
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
          "id": "catalog-128",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -2.55,
            "y": 1
          },
          "text": "PSH",
          "height": 2.4,
          "rotation": 0
        },
        {
          "id": "catalog-129",
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
          "id": "catalog-130",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-131",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -2.55,
            "y": 0
          },
          "text": "PSL",
          "height": 2.4,
          "rotation": 0
        },
        {
          "id": "catalog-132",
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
          "id": "catalog-133",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-134",
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
          "id": "catalog-135",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -2.55,
            "y": 1
          },
          "text": "PSL",
          "height": 2.4,
          "rotation": 0
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
          "type": "text",
          "position": {
            "x": -2.55,
            "y": 0
          },
          "text": "TSH",
          "height": 2.4,
          "rotation": 0
        },
        {
          "id": "catalog-139",
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
          "id": "catalog-140",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-141",
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
          "id": "catalog-142",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -2.55,
            "y": 1
          },
          "text": "TSH",
          "height": 2.4,
          "rotation": 0
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
          "type": "text",
          "position": {
            "x": -2.55,
            "y": 0
          },
          "text": "LSH",
          "height": 2.4,
          "rotation": 0
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
            "x": -6,
            "y": 0
          },
          "b": {
            "x": 6,
            "y": 0
          }
        },
        {
          "id": "catalog-149",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -2.55,
            "y": 1
          },
          "text": "LSH",
          "height": 2.4,
          "rotation": 0
        },
        {
          "id": "catalog-150",
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
          "id": "catalog-151",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-152",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -2.55,
            "y": 0
          },
          "text": "LSL",
          "height": 2.4,
          "rotation": 0
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
          "type": "text",
          "position": {
            "x": -2.55,
            "y": 1
          },
          "text": "LSL",
          "height": 2.4,
          "rotation": 0
        },
        {
          "id": "catalog-157",
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
          "id": "catalog-158",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-159",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -2.55,
            "y": 0
          },
          "text": "PDT",
          "height": 2.4,
          "rotation": 0
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
          "id": "catalog-161",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-162",
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
          "id": "catalog-163",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -2.55,
            "y": 1
          },
          "text": "PDT",
          "height": 2.4,
          "rotation": 0
        },
        {
          "id": "catalog-164",
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
          "id": "catalog-165",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-166",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -1.7,
            "y": 0
          },
          "text": "FE",
          "height": 2.4,
          "rotation": 0
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
          "type": "text",
          "position": {
            "x": -1.7,
            "y": 1
          },
          "text": "FE",
          "height": 2.4,
          "rotation": 0
        },
        {
          "id": "catalog-171",
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
          "id": "catalog-172",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-173",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -1.7,
            "y": 0
          },
          "text": "TE",
          "height": 2.4,
          "rotation": 0
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
            "x": -6,
            "y": 0
          },
          "b": {
            "x": 6,
            "y": 0
          }
        },
        {
          "id": "catalog-177",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -1.7,
            "y": 1
          },
          "text": "TE",
          "height": 2.4,
          "rotation": 0
        },
        {
          "id": "catalog-178",
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
          "id": "catalog-179",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-180",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -2.55,
            "y": 0
          },
          "text": "AIT",
          "height": 2.4,
          "rotation": 0
        },
        {
          "id": "catalog-181",
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
          "id": "catalog-182",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-183",
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
          "id": "catalog-184",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -2.55,
            "y": 1
          },
          "text": "AIT",
          "height": 2.4,
          "rotation": 0
        },
        {
          "id": "catalog-185",
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
          "id": "catalog-186",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-187",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -2.55,
            "y": 0
          },
          "text": "SIT",
          "height": 2.4,
          "rotation": 0
        },
        {
          "id": "catalog-188",
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
          "id": "catalog-189",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-190",
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
          "id": "catalog-191",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -2.55,
            "y": 1
          },
          "text": "SIT",
          "height": 2.4,
          "rotation": 0
        },
        {
          "id": "catalog-192",
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
      "id": "isa-dcs-fy",
      "name": "Flow computing relay (DCS/PLC)",
      "library": "P&ID",
      "group": "DCS and PLC functions",
      "standard": "ANSI/ISA-5.1",
      "category": "P&ID / ANSI/ISA-5.1 / DCS and PLC functions",
      "entities": [
        {
          "id": "catalog-193",
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
          "id": "catalog-194",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-195",
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
          "id": "catalog-196",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -1.7,
            "y": 1
          },
          "text": "FY",
          "height": 2.3,
          "rotation": 0
        },
        {
          "id": "catalog-197",
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
          "id": "catalog-198",
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
          "id": "catalog-199",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-200",
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
          "id": "catalog-201",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -1.7,
            "y": 1
          },
          "text": "PY",
          "height": 2.3,
          "rotation": 0
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
          "type": "text",
          "position": {
            "x": -1.7,
            "y": 1
          },
          "text": "TY",
          "height": 2.3,
          "rotation": 0
        },
        {
          "id": "catalog-207",
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
          "id": "catalog-208",
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
          "id": "catalog-209",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-210",
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
          "id": "catalog-211",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -1.7,
            "y": 1
          },
          "text": "HS",
          "height": 2.3,
          "rotation": 0
        },
        {
          "id": "catalog-212",
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
          "id": "catalog-213",
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
          "id": "catalog-214",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-215",
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
          "id": "catalog-216",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -2.55,
            "y": 1
          },
          "text": "LAH",
          "height": 2.3,
          "rotation": 0
        },
        {
          "id": "catalog-217",
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
          "id": "catalog-218",
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
          "id": "catalog-219",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-220",
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
          "id": "catalog-221",
          "layer": "0",
          "type": "text",
          "position": {
            "x": -2.55,
            "y": 1
          },
          "text": "PAH",
          "height": 2.3,
          "rotation": 0
        },
        {
          "id": "catalog-222",
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
          "id": "catalog-223",
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
          "id": "catalog-224",
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
          "id": "catalog-225",
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
          "id": "catalog-226",
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
          "id": "catalog-227",
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
          "id": "catalog-228",
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
          "id": "catalog-229",
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
          "id": "catalog-230",
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
          "id": "catalog-231",
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
          "id": "catalog-232",
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
          "id": "catalog-233",
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
          "id": "catalog-234",
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
          "id": "catalog-235",
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
          "id": "catalog-236",
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
          "id": "catalog-237",
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
          "id": "catalog-238",
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
          "id": "catalog-239",
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
          "id": "catalog-240",
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
          "id": "catalog-241",
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
          "id": "catalog-242",
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
          "id": "catalog-243",
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
          "id": "catalog-244",
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
          "id": "catalog-245",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 4
        },
        {
          "id": "catalog-246",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 2
        },
        {
          "id": "catalog-247",
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
          "id": "catalog-248",
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
          "id": "catalog-249",
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
          "id": "catalog-250",
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
          "id": "catalog-251",
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
          "id": "catalog-252",
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
          "id": "catalog-253",
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
          "id": "catalog-254",
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
          "id": "catalog-255",
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
          "id": "catalog-256",
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
          "id": "catalog-257",
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
          "id": "catalog-258",
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
          "id": "catalog-259",
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
          "id": "catalog-260",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-261",
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
          "id": "catalog-262",
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
          "id": "catalog-263",
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
          "id": "catalog-264",
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
          "id": "catalog-265",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-266",
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
          "id": "catalog-267",
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
          "id": "catalog-268",
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
          "id": "catalog-269",
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
          "id": "catalog-270",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": -2,
            "y": 0
          },
          "radius": 4
        },
        {
          "id": "catalog-271",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 2,
            "y": 0
          },
          "radius": 4
        },
        {
          "id": "catalog-272",
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
          "id": "catalog-273",
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
          "id": "catalog-274",
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
          "id": "catalog-275",
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
          "id": "catalog-276",
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
          "id": "catalog-277",
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
          "id": "catalog-278",
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
          "id": "catalog-279",
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
          "id": "catalog-280",
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
          "id": "catalog-281",
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
          "id": "catalog-282",
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
          "id": "catalog-283",
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
          "id": "catalog-284",
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
          "id": "catalog-285",
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
          "id": "catalog-286",
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
          "id": "catalog-287",
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
          "id": "catalog-288",
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
          "id": "catalog-289",
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
          "id": "catalog-290",
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
          "id": "catalog-291",
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
          "id": "catalog-292",
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
          "id": "catalog-293",
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
          "id": "catalog-294",
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
          "id": "catalog-295",
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
          "id": "catalog-296",
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
          "id": "catalog-297",
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
          "id": "catalog-298",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 14
          },
          "radius": 2
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
            "x": -7,
            "y": 0
          }
        },
        {
          "id": "catalog-300",
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
          "id": "catalog-301",
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
          "id": "catalog-302",
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
          "id": "catalog-303",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-304",
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
          "id": "catalog-305",
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
          "id": "catalog-306",
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
          "id": "catalog-307",
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
          "id": "catalog-308",
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
          "id": "catalog-309",
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
          "id": "catalog-310",
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
          "id": "catalog-311",
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
          "id": "catalog-312",
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
          "id": "catalog-313",
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
          "id": "catalog-314",
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
          "id": "catalog-315",
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
          "id": "catalog-316",
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
      "id": "electric-fuse",
      "name": "Fuse",
      "library": "Electrical multi-line",
      "group": "Protection",
      "standard": "IEC 60617",
      "category": "Electrical multi-line / IEC 60617 / Protection",
      "entities": [
        {
          "id": "catalog-317",
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
          "id": "catalog-318",
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
          "id": "catalog-319",
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
          "id": "catalog-320",
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
          "id": "catalog-321",
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
          "id": "catalog-322",
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
          "id": "catalog-323",
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
          "id": "catalog-324",
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
          "id": "catalog-325",
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
          "id": "catalog-326",
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
          "id": "catalog-327",
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
          "id": "catalog-328",
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
          "id": "catalog-329",
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
          "id": "catalog-330",
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
          "id": "catalog-331",
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
          "id": "catalog-332",
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
          "id": "catalog-333",
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
          "id": "catalog-334",
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
          "id": "catalog-335",
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
          "id": "catalog-336",
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
          "id": "catalog-337",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 5
        },
        {
          "id": "catalog-338",
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
          "id": "catalog-339",
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
          "id": "catalog-340",
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
          "id": "catalog-341",
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
          "id": "catalog-342",
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
          "id": "catalog-343",
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
          "id": "catalog-344",
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
          "id": "catalog-345",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-346",
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
          "id": "catalog-347",
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
          "id": "catalog-348",
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
          "id": "catalog-349",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-350",
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
          "id": "catalog-351",
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
          "id": "catalog-352",
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
          "id": "catalog-353",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-354",
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
          "id": "catalog-355",
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
          "id": "catalog-356",
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
          "id": "catalog-357",
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
          "id": "catalog-358",
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
          "id": "catalog-359",
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
          "id": "catalog-360",
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
          "id": "catalog-361",
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
          "id": "catalog-362",
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
          "id": "catalog-363",
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
          "id": "catalog-364",
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
          "id": "catalog-365",
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
          "id": "catalog-366",
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
          "id": "catalog-367",
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
          "id": "catalog-368",
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
          "id": "catalog-369",
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
          "id": "catalog-370",
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
          "id": "catalog-371",
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
          "id": "catalog-372",
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
          "id": "catalog-373",
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
          "id": "catalog-374",
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
          "id": "catalog-375",
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
          "id": "catalog-376",
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
          "id": "catalog-377",
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
          "id": "catalog-378",
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
          "id": "catalog-379",
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
          "id": "catalog-380",
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
          "id": "catalog-381",
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
          "id": "catalog-382",
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
          "id": "catalog-383",
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
          "id": "catalog-384",
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
          "id": "catalog-385",
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
          "id": "catalog-386",
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
          "id": "catalog-387",
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
          "id": "catalog-388",
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
          "id": "catalog-389",
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
          "id": "catalog-390",
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
          "id": "catalog-391",
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
          "id": "catalog-392",
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
          "id": "catalog-393",
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
          "id": "catalog-394",
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
          "id": "catalog-395",
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
          "id": "catalog-396",
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
          "id": "catalog-397",
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
          "id": "catalog-398",
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
          "id": "catalog-399",
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
          "id": "catalog-400",
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
          "id": "catalog-401",
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
          "id": "catalog-402",
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
          "id": "catalog-403",
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
          "id": "catalog-404",
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
          "id": "catalog-405",
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
          "id": "catalog-406",
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
          "id": "catalog-407",
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
          "id": "catalog-408",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-409",
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
          "id": "catalog-410",
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
          "id": "catalog-411",
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
          "id": "catalog-412",
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
          "id": "catalog-413",
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
          "id": "catalog-414",
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
          "id": "catalog-415",
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
          "id": "catalog-416",
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
          "id": "catalog-417",
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
          "id": "catalog-418",
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
          "id": "catalog-419",
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
          "id": "catalog-420",
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
          "id": "catalog-421",
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
          "id": "catalog-422",
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
          "id": "catalog-423",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-424",
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
          "id": "catalog-425",
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
          "id": "catalog-426",
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
          "id": "catalog-427",
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
          "id": "catalog-428",
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
          "id": "catalog-429",
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
          "id": "catalog-430",
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
          "id": "catalog-431",
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
          "id": "catalog-432",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 0.8
        },
        {
          "id": "catalog-433",
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
          "id": "catalog-434",
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
          "id": "catalog-435",
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
          "id": "catalog-436",
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
          "id": "catalog-437",
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
          "id": "catalog-438",
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
          "id": "catalog-439",
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
          "id": "catalog-440",
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
          "id": "catalog-441",
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
          "id": "catalog-442",
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
          "id": "catalog-443",
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
          "id": "catalog-444",
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
          "id": "catalog-445",
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
          "id": "catalog-446",
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
          "id": "catalog-447",
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
          "id": "catalog-448",
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
          "id": "catalog-449",
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
          "id": "catalog-450",
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
          "id": "catalog-451",
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
          "id": "catalog-452",
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
          "id": "catalog-453",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 5
        },
        {
          "id": "catalog-454",
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
          "id": "catalog-455",
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
          "id": "catalog-456",
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
          "id": "catalog-457",
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
          "id": "catalog-458",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 5
          },
          "radius": 0.8
        },
        {
          "id": "catalog-459",
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
          "id": "catalog-460",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": -5
          },
          "radius": 0.8
        },
        {
          "id": "catalog-461",
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
          "id": "catalog-462",
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
          "id": "catalog-463",
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
          "id": "catalog-464",
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
          "id": "catalog-465",
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
          "id": "catalog-466",
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
          "id": "catalog-467",
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
          "id": "catalog-468",
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
          "id": "catalog-469",
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
          "id": "catalog-470",
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
          "id": "catalog-471",
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
          "id": "catalog-472",
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
          "id": "catalog-473",
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
          "id": "catalog-474",
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
          "id": "catalog-475",
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
          "id": "catalog-476",
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
          "id": "catalog-477",
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
          "id": "catalog-478",
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
          "id": "catalog-479",
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
          "id": "catalog-480",
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
          "id": "catalog-481",
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
          "id": "catalog-482",
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
          "id": "catalog-483",
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
          "id": "catalog-484",
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
          "id": "catalog-485",
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
          "id": "catalog-486",
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
          "id": "catalog-487",
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
          "id": "catalog-488",
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
          "id": "catalog-489",
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
          "id": "catalog-490",
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
          "id": "catalog-491",
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
          "id": "catalog-492",
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
          "id": "catalog-493",
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
          "id": "catalog-494",
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
          "id": "catalog-495",
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
          "id": "catalog-496",
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
          "id": "catalog-497",
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
          "id": "catalog-498",
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
          "id": "catalog-499",
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
          "id": "catalog-500",
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
          "id": "catalog-501",
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
          "id": "catalog-502",
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
          "id": "catalog-503",
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
          "id": "catalog-504",
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
          "id": "catalog-505",
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
          "id": "catalog-506",
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
          "id": "catalog-507",
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
          "id": "catalog-508",
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
          "id": "catalog-509",
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
          "id": "catalog-510",
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
          "id": "catalog-511",
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
          "id": "catalog-512",
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
          "id": "catalog-513",
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
          "id": "catalog-514",
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
          "id": "catalog-515",
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
          "id": "catalog-516",
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
          "id": "catalog-517",
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
          "id": "catalog-518",
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
          "id": "catalog-519",
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
          "id": "catalog-520",
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
          "id": "catalog-521",
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
          "id": "catalog-522",
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
          "id": "catalog-523",
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
          "id": "catalog-524",
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
          "id": "catalog-525",
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
          "id": "catalog-526",
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
          "id": "catalog-527",
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
          "id": "catalog-528",
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
          "id": "catalog-529",
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
          "id": "catalog-530",
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
          "id": "catalog-531",
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
          "id": "catalog-532",
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
          "id": "catalog-533",
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
          "id": "catalog-534",
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
          "id": "catalog-535",
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
          "id": "catalog-536",
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
          "id": "catalog-537",
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
          "id": "catalog-538",
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
          "id": "catalog-539",
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
          "id": "catalog-540",
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
          "id": "catalog-541",
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
          "id": "catalog-542",
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
          "id": "catalog-543",
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
          "id": "catalog-544",
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
          "id": "catalog-545",
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
          "id": "catalog-546",
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
          "id": "catalog-547",
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
          "id": "catalog-548",
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
          "id": "catalog-549",
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
          "id": "catalog-550",
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
          "id": "catalog-551",
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
          "id": "catalog-552",
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
          "id": "catalog-553",
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
          "id": "catalog-554",
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
          "id": "catalog-555",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 3
          },
          "radius": 4
        },
        {
          "id": "catalog-556",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": -3
          },
          "radius": 4
        },
        {
          "id": "catalog-557",
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
          "id": "catalog-558",
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
          "id": "catalog-559",
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
          "id": "catalog-560",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 4
        },
        {
          "id": "catalog-561",
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
          "id": "catalog-562",
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
          "id": "catalog-563",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 3
          },
          "radius": 4
        },
        {
          "id": "catalog-564",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": -3
          },
          "radius": 4
        },
        {
          "id": "catalog-565",
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
          "id": "catalog-566",
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
          "id": "catalog-567",
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
          "id": "catalog-568",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 6
        },
        {
          "id": "catalog-569",
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
          "id": "catalog-570",
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
          "id": "catalog-571",
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
          "id": "catalog-572",
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
          "id": "catalog-573",
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
          "id": "catalog-574",
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
          "id": "catalog-575",
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
          "id": "catalog-576",
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
          "id": "catalog-577",
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
          "id": "catalog-578",
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
          "id": "catalog-579",
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
          "id": "catalog-580",
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
          "id": "catalog-581",
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
          "id": "catalog-582",
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
          "id": "catalog-585",
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
          "id": "catalog-586",
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
          "id": "catalog-587",
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
          "id": "catalog-588",
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
          "id": "catalog-589",
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
          "id": "catalog-590",
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
          "id": "catalog-591",
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
          "id": "catalog-592",
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
          "id": "catalog-593",
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
          "id": "catalog-594",
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
          "id": "catalog-595",
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
          "id": "catalog-596",
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
          "id": "catalog-597",
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
          "id": "catalog-598",
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
          "id": "catalog-599",
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
          "id": "catalog-600",
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
          "id": "catalog-601",
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
          "id": "catalog-602",
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
      "id": "general-arrow",
      "name": "Arrow",
      "library": "General",
      "group": "Annotation and shapes",
      "standard": "ISO 128",
      "category": "General / ISO 128 / Annotation and shapes",
      "entities": [
        {
          "id": "catalog-603",
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
          "id": "catalog-604",
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
          "id": "catalog-605",
          "layer": "0",
          "type": "circle",
          "center": {
            "x": 0,
            "y": 0
          },
          "radius": 4
        },
        {
          "id": "catalog-606",
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
          "id": "catalog-607",
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
          "id": "catalog-608",
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
          "id": "catalog-609",
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
          "id": "catalog-610",
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
          "id": "catalog-611",
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
      "id": "pump",
      "type": "insert",
      "layer": "0",
      "block": "pid-pump",
      "position": {
        "x": -30,
        "y": 0
      },
      "rotation": 0,
      "scale": {
        "x": 1,
        "y": 1
      },
      "attributes": {
        "TAG": "P-101",
        "VALORE": "4 kW",
        "DESCRIZIONE": "Water"
      }
    },
    {
      "id": "valve",
      "type": "insert",
      "layer": "0",
      "block": "pid-control",
      "position": {
        "x": 30,
        "y": 0
      },
      "rotation": 0,
      "scale": {
        "x": 1,
        "y": 1
      },
      "attributes": {
        "TAG": "FV-101",
        "VALORE": "DN25",
        "DESCRIZIONE": ""
      }
    },
    {
      "id": "wire",
      "type": "wire",
      "layer": "PIPES",
      "points": [
        {
          "x": -20,
          "y": 0
        },
        {
          "x": -15,
          "y": 0
        },
        {
          "x": 0,
          "y": 0
        },
        {
          "x": 15,
          "y": 0
        },
        {
          "x": 20,
          "y": 0
        }
      ],
      "from": {
        "insertId": "pump",
        "portId": "OUT"
      },
      "to": {
        "insertId": "valve",
        "portId": "IN"
      }
    },
    {
      "id": "line",
      "layer": "0",
      "type": "line",
      "a": {
        "x": -20,
        "y": -20
      },
      "b": {
        "x": 50,
        "y": -20
      }
    },
    {
      "id": "poly",
      "type": "polyline",
      "layer": "SIGNALS",
      "points": [
        {
          "x": 0,
          "y": 20
        },
        {
          "x": 10,
          "y": 20
        },
        {
          "x": 10,
          "y": 30
        }
      ],
      "closed": false
    },
    {
      "id": "circle",
      "type": "circle",
      "layer": "0",
      "center": {
        "x": 70,
        "y": 0
      },
      "radius": 5
    },
    {
      "id": "arc",
      "type": "arc",
      "layer": "0",
      "center": {
        "x": 70,
        "y": 20
      },
      "radius": 8,
      "start": 300,
      "end": 60
    },
    {
      "id": "text",
      "type": "text",
      "layer": "0",
      "position": {
        "x": 0,
        "y": -30
      },
      "height": 4,
      "rotation": 30,
      "text": "Diagram Δ – Ø25"
    }
  ]
}
```
