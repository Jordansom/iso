// data.js - ISO 39001:2012 Preguntas de Auditoría (bloques por cláusula)

// Recomendación general que aparecerá siempre en el PDF
const generalRecommendation = "Para cumplir con ISO 39001:2012, la clave es alinear la operación real con un sistema ordenado. Se ha detectado que la organización debe trabajar en cerrar las brechas documentales y operativas detectadas en esta evaluación para garantizar la seguridad vial y la conformidad con la norma.";

const evaluationData = [
    // ── CLÁUSULA 4 ──────────────────────────────────────────────────────────
    {
        id: "clause4",
        title: "4. Contexto de la organización",
        icon: "fa-sitemap",
        description: "Cláusula 4: Contexto de la organización, partes interesadas, alcance y sistema de gestión.",
        questions: [
            // 4.1
            { id: "q4_1_1", clause: "4", subsection: "4.1", text: "¿Cómo ha determinado la organización las cuestiones externas e internas que afectan su capacidad para lograr los resultados del SGSV?", evidence: "Análisis de contexto documentado (FODA, PESTEL, análisis de riesgo vial por ruta)" },
            { id: "q4_1_2", clause: "4", subsection: "4.1", text: "¿Cuál es el rol identificado de la empresa en el sistema vial? ¿Está documentado?", evidence: "Documento de alcance, descripción de operaciones y tipo de rutas operadas" },
            { id: "q4_1_3", clause: "4", subsection: "4.1", text: "¿Cómo se identificaron los procesos, actividades y funciones que pueden afectar la seguridad vial?", evidence: "Mapa de procesos con indicación de los que tienen impacto en SV" },
            { id: "q4_1_4", clause: "4", subsection: "4.1", text: "¿Está definida la secuencia e interacción de esos procesos con impacto en SV?", evidence: "Diagrama o matriz de interacción de procesos (despacho, conducción, carga, mantenimiento)" },
            // 4.2
            { id: "q4_2_1", clause: "4", subsection: "4.2", text: "¿Qué partes interesadas relevantes al SGSV han sido identificadas?", evidence: "Registro o matriz de partes interesadas (clientes, conductores, autoridades, aseguradoras, comunidades)" },
            { id: "q4_2_2", clause: "4", subsection: "4.2", text: "¿Cómo se determinaron los requisitos de cada parte interesada en materia de SV?", evidence: "Matriz de requisitos legales y compromisos contraídos, contratos con clientes que incluyan SV" },
            { id: "q4_2_3", clause: "4", subsection: "4.2", text: "¿Se han identificado y registrado los requisitos legales aplicables en materia de SV (reglamentos de tránsito, normas de peso y dimensiones, licencias de conducir comerciales, etc.)?", evidence: "Listado de requisitos legales vigente, con fecha de actualización" },
            // 4.3
            { id: "q4_3_1", clause: "4", subsection: "4.3", text: "¿Cómo se determinó el alcance del sistema de gestión de SV? ¿Qué operaciones, rutas y unidades incluye?", evidence: "Documento de alcance firmado y disponible" },
            { id: "q4_3_2", clause: "4", subsection: "4.3", text: "¿Los resultados previstos del SGSV incluyen explícitamente la reducción de muertes y heridas graves?", evidence: "Declaración de alcance con resultados esperados del sistema" },
            { id: "q4_3_3", clause: "4", subsection: "4.3", text: "¿El alcance está disponible como información documentada?", evidence: "Documento de alcance en el sistema de gestión documental" },
            // 4.4
            { id: "q4_4_1", clause: "4", subsection: "4.4", text: "¿La organización ha establecido, implementado, mantiene y mejora continuamente un SGSV con sus procesos e interacciones?", evidence: "Manual del SGSV o descripción del sistema con mapa de procesos e interacciones" },
        ]
    },

    // ── CLÁUSULA 5 ──────────────────────────────────────────────────────────
    {
        id: "clause5",
        title: "5. Liderazgo",
        icon: "fa-users-gear",
        description: "Cláusula 5: Liderazgo y compromiso, política de SV, roles y responsabilidades.",
        questions: [
            // 5.1
            { id: "q5_1_1", clause: "5", subsection: "5.1", text: "¿Cómo demuestra la alta dirección su liderazgo y compromiso activo con el SGSV? Solicite ejemplos concretos.", evidence: "Actas de reunión de dirección con temas de SV, comunicados firmados, visitas documentadas a operaciones" },
            { id: "q5_1_2", clause: "5", subsection: "5.1", text: "¿La política y los objetivos de SV son compatibles con la dirección estratégica de la empresa?", evidence: "Plan estratégico o planeación anual con alineación a objetivos de SV" },
            { id: "q5_1_3", clause: "5", subsection: "5.1", text: "¿Se han asegurado recursos suficientes para el SGSV? ¿Cómo se aprueba el presupuesto de SV?", evidence: "Presupuesto aprobado para SV, registros de inversiones en capacitación, tecnología y mantenimiento" },
            { id: "q5_1_4", clause: "5", subsection: "5.1", text: "¿La alta dirección ha adoptado formalmente la eliminación de muertes y heridas graves como objetivo a largo plazo?", evidence: "Acta o declaración formal de la dirección, política de SV con esta visión" },
            { id: "q5_1_5", clause: "5", subsection: "5.1", text: "¿La dirección trabaja en colaboración con partes interesadas externas (autoridades, clientes, proveedores) para contribuir a un sistema vial seguro?", evidence: "Convenios, actas de reuniones con autoridades, participación en gremios o programas de SV" },
            { id: "q5_1_6", clause: "5", subsection: "5.1", text: "¿Cómo comunica la alta dirección la importancia del cumplimiento legal en materia de SV al personal?", evidence: "Comunicados internos, registros de pláticas de inducción, reuniones de inicio de turno" },
            // 5.2
            { id: "q5_2_1", clause: "5", subsection: "5.2", text: "¿Existe una política de SV formalmente aprobada por la alta dirección? ¿Está firmada y fechada?", evidence: "Política de SV con firma del Director General, fecha de emisión y próxima revisión" },
            { id: "q5_2_2", clause: "5", subsection: "5.2", text: "¿La política incluye el compromiso de cumplir los requisitos legales aplicables y de mejora continua del SGSV?", evidence: "Revisión del contenido de la política contra los requisitos de la norma (incisos a-d de §5.2)" },
            { id: "q5_2_3", clause: "5", subsection: "5.2", text: "¿Cómo se comunica la política a todo el personal? ¿Tienen acceso a ella los conductores?", evidence: "Acuse de recibo o firmas de conocimiento, evidencia de publicación en instalaciones y unidades" },
            { id: "q5_2_4", clause: "5", subsection: "5.2", text: "¿La política está disponible para partes interesadas externas?", evidence: "Política publicada en sitio web, disponible para clientes o autoridades bajo solicitud" },
            // 5.3
            { id: "q5_3_1", clause: "5", subsection: "5.3", text: "¿Están definidos y comunicados los roles y responsabilidades en materia de SV dentro de la organización?", evidence: "Organigrama con responsabilidades de SV, perfiles de puesto actualizados" },
            { id: "q5_3_2", clause: "5", subsection: "5.3", text: "¿Se ha designado formalmente un responsable del SGSV con autoridad suficiente? ¿Cuál es su nivel jerárquico?", evidence: "Nombramiento formal del representante del SGSV, descripción de sus funciones y autoridad" },
            { id: "q5_3_3", clause: "5", subsection: "5.3", text: "¿El responsable del SGSV reporta a la alta dirección sobre el desempeño del sistema e incluye recomendaciones de mejora?", evidence: "Informes periódicos del responsable a la dirección, presentaciones en reuniones de revisión" },
        ]
    },

    // ── CLÁUSULA 6 ──────────────────────────────────────────────────────────
    {
        id: "clause6",
        title: "6. Planificación",
        icon: "fa-chart-gantt",
        description: "Cláusula 6: Generalidades, riesgos y oportunidades, factores de desempeño y objetivos de SV.",
        questions: [
            // 6.1
            { id: "q6_1_1", clause: "6", subsection: "6.1", text: "¿La organización cuenta con un proceso documentado para revisar su desempeño actual en SV?", evidence: "Reporte de desempeño en SV con estadísticas de siniestralidad, km recorridos, frecuencia de incidentes" },
            { id: "q6_1_2", clause: "6", subsection: "6.1", text: "¿Cómo se cuantifica el desempeño actual en SV? ¿Qué indicadores se utilizan?", evidence: "Dashboard o tablero de indicadores SV con datos históricos" },
            // 6.2
            { id: "q6_2_1", clause: "6", subsection: "6.2", text: "¿Se ha realizado un análisis de riesgos y oportunidades de SV considerando el contexto y los requisitos de las partes interesadas?", evidence: "Matriz de riesgos y oportunidades de SV (ej. rutas nocturnas, sobrecargas, fatiga, conducción distraída)" },
            { id: "q6_2_2", clause: "6", subsection: "6.2", text: "¿Cómo se planificaron las acciones para tratar los riesgos identificados? ¿Quién es el responsable de cada acción?", evidence: "Plan de acción con responsables, fechas y criterios de evaluación de eficacia" },
            { id: "q6_2_3", clause: "6", subsection: "6.2", text: "¿Se evalúa la eficacia de las acciones implementadas para tratar riesgos? Muestre un ejemplo.", evidence: "Registro de seguimiento de acciones con evidencia de cierre y verificación de eficacia" },
            // 6.3
            { id: "q6_3_1", clause: "6", subsection: "6.3", text: "¿Cuáles factores de desempeño en SV ha seleccionado la organización? ¿Cómo se justificó esa selección?", evidence: "Documento de selección y justificación de factores de desempeño SV, alineados al contexto de transporte de carga" },
            { id: "q6_3_2", clause: "6", subsection: "6.3", text: "¿Cómo se controla y monitorea la velocidad de conducción? ¿Existen límites internos más estrictos que los legales?", evidence: "Registros de telemetría/GPS, política interna de velocidades, reportes de excesos de velocidad" },
            { id: "q6_3_3", clause: "6", subsection: "6.3", text: "¿Qué mecanismos existen para detectar y gestionar la fatiga, el alcohol y las drogas en conductores?", evidence: "Procedimiento de pruebas de alcoholemia y fatiga, registros de pruebas aplicadas, resultados" },
            { id: "q6_3_4", clause: "6", subsection: "6.3", text: "¿Cómo se garantiza la seguridad de los vehículos antes de cada viaje?", evidence: "Listas de verificación pre-viaje firmadas, registros de mantenimiento preventivo y correctivo" },
            { id: "q6_3_5", clause: "6", subsection: "6.3", text: "¿Cómo se gestiona el aseguramiento de la carga y la estiba? ¿Existe un procedimiento?", evidence: "Procedimiento de carga y estiba, listas de verificación de estiba firmadas por operador y supervisor" },
            { id: "q6_3_6", clause: "6", subsection: "6.3", text: "¿Cómo se planifican los viajes de manera segura (rutas, tiempos, descansos, conductor asignado)?", evidence: "Hojas de ruta aprobadas, registros de planificación de viaje, política de horas de conducción y descanso" },
            { id: "q6_3_7", clause: "6", subsection: "6.3", text: "¿Se verifica que todos los conductores cuentan con la licencia adecuada al tipo de vehículo que operan? ¿Con qué frecuencia?", evidence: "Expediente de conductores con copia de licencias vigentes, registro de verificaciones periódicas" },
            { id: "q6_3_8", clause: "6", subsection: "6.3", text: "¿Existe un procedimiento para retirar de la operación a conductores o vehículos no aptos?", evidence: "Procedimiento documentado de inhabilitación temporal/permanente, registros de aplicación" },
            { id: "q6_3_9", clause: "6", subsection: "6.3", text: "¿Están definidos los elementos y criterios específicos para cada factor de desempeño seleccionado?", evidence: "Tabla de factores con elementos y criterios medibles documentada y actualizada" },
            // 6.4
            { id: "q6_4_1", clause: "6", subsection: "6.4", text: "¿Existen objetivos de SV establecidos en las funciones y niveles pertinentes de la organización?", evidence: "Objetivos de SV documentados, medibles, con responsable asignado y plazo definido" },
            { id: "q6_4_2", clause: "6", subsection: "6.4", text: "¿Los objetivos de SV son coherentes con la política y tienen en cuenta los requisitos aplicables?", evidence: "Matriz de coherencia entre política, riesgos, factores de desempeño y objetivos de SV" },
            { id: "q6_4_3", clause: "6", subsection: "6.4", text: "¿Cómo se le da seguimiento al logro de los objetivos de SV? ¿Con qué frecuencia se revisan?", evidence: "Reportes periódicos de seguimiento a objetivos, actas de revisión con tendencias" },
            { id: "q6_4_4", clause: "6", subsection: "6.4", text: "¿Los planes de acción para lograr los objetivos especifican qué, quién, con qué recursos, cuándo y cómo se evaluarán los resultados?", evidence: "Planes de acción documentados con los cinco elementos requeridos por la norma" },
        ]
    },

    // ── CLÁUSULA 7 ──────────────────────────────────────────────────────────
    {
        id: "clause7",
        title: "7. Soporte",
        icon: "fa-hand-holding-hand",
        description: "Cláusula 7: Coordinación, recursos, competencia, toma de conciencia, comunicación e información documentada.",
        questions: [
            // 7.1
            { id: "q7_1_1", clause: "7", subsection: "7.1", text: "¿Cómo se coordina la organización internamente (operaciones, mantenimiento, RRHH, despacho) para alcanzar los objetivos de SV?", evidence: "Actas de reuniones interdepartamentales de SV, roles de coordinación definidos" },
            { id: "q7_1_2", clause: "7", subsection: "7.1", text: "¿Existe coordinación externa con partes interesadas clave como autoridades de tránsito, clientes o talleres?", evidence: "Evidencia de reuniones, convenios o comunicaciones con partes externas relacionadas a SV" },
            // 7.2
            { id: "q7_2_1", clause: "7", subsection: "7.2", text: "¿Cómo determina la organización qué recursos son necesarios para el SGSV? ¿Se revisa periódicamente?", evidence: "Análisis de necesidades de recursos documentado, presupuesto aprobado para SV" },
            { id: "q7_2_2", clause: "7", subsection: "7.2", text: "¿Se proporcionan recursos tecnológicos para el monitoreo de SV (GPS, tacógrafos, alcoholímetros, cámaras)?", evidence: "Inventario de equipos de SV, contratos de servicio de telemetría, calibraciones vigentes" },
            // 7.3
            { id: "q7_3_1", clause: "7", subsection: "7.3", text: "¿Están definidas las competencias en SV requeridas para cada puesto (conductor, despachador, supervisor, mecánico)?", evidence: "Perfiles de puesto con competencias de SV especificadas" },
            { id: "q7_3_2", clause: "7", subsection: "7.3", text: "¿Cómo se verifica que los conductores y personal operativo son competentes en SV? ¿Hay evaluaciones?", evidence: "Registros de evaluaciones de competencia, resultados de pruebas de conocimiento y manejo" },
            { id: "q7_3_3", clause: "7", subsection: "7.3", text: "¿Qué acciones se toman cuando se detecta una brecha de competencia en SV?", evidence: "Registro de necesidades de formación, constancias de capacitación: manejo defensivo, primeros auxilios, fatiga" },
            { id: "q7_3_4", clause: "7", subsection: "7.3", text: "¿Se conserva información documentada como evidencia de la competencia del personal?", evidence: "Expedientes de personal con constancias de capacitación, certificaciones y evaluaciones" },
            // 7.4
            { id: "q7_4_1", clause: "7", subsection: "7.4", text: "¿El personal que realiza trabajo con impacto en SV conoce la política de SV de la empresa?", evidence: "Registros de inducción, acuses de conocimiento de la política firmados por conductores y personal" },
            { id: "q7_4_2", clause: "7", subsection: "7.4", text: "¿El personal comprende cómo contribuye a la eficacia del SGSV y qué consecuencias tiene no cumplir sus requisitos?", evidence: "Materiales de comunicación interna, registros de pláticas de concienciación con firmas de asistencia" },
            { id: "q7_4_3", clause: "7", subsection: "7.4", text: "¿Se comunican al personal las lecciones aprendidas de los principales incidentes de tráfico ocurridos en la empresa?", evidence: "Comunicados internos de lecciones aprendidas, registros de reuniones donde se discutieron incidentes" },
            // 7.5
            { id: "q7_5_1", clause: "7", subsection: "7.5", text: "¿Existe un plan o matriz de comunicación interna y externa para el SGSV? ¿Define qué, cuándo y a quién se comunica?", evidence: "Plan de comunicación documentado del SGSV" },
            { id: "q7_5_2", clause: "7", subsection: "7.5", text: "¿Cómo se comunican internamente los temas de SV a los conductores? ¿Con qué frecuencia?", evidence: "Registros de reuniones de inicio de turno, boletines, correos, aplicación de mensajería interna" },
            { id: "q7_5_3", clause: "7", subsection: "7.5", text: "¿Cómo promueve la organización el enfoque a largo plazo en SV con sus partes interesadas externas?", evidence: "Comunicaciones externas sobre SV, participación en foros o programas de seguridad vial del sector" },
            // 7.6
            { id: "q7_6_1", clause: "7", subsection: "7.6.1", text: "¿El SGSV incluye toda la información documentada requerida por la norma? ¿Existe un listado maestro de documentos?", evidence: "Listado maestro de documentos y registros del SGSV actualizado" },
            { id: "q7_6_2", clause: "7", subsection: "7.6.2", text: "¿Los documentos del SGSV incluyen identificación, fecha, autor o número de referencia? ¿Están aprobados?", evidence: "Procedimiento de control documental, documentos con encabezado completo y firma de aprobación" },
            { id: "q7_6_3", clause: "7", subsection: "7.6.3", text: "¿Cómo se controla que los documentos vigentes estén disponibles donde se necesitan y protegidos contra uso inadecuado?", evidence: "Sistema de gestión documental (físico o digital), registro de distribución, control de versiones" },
            { id: "q7_6_4", clause: "7", subsection: "7.6.3", text: "¿Cómo se controla la información documentada de origen externo relevante para el SGSV (reglamentos, normas técnicas)?", evidence: "Listado de documentos externos controlados con fechas de actualización y responsable de seguimiento" },
        ]
    },

    // ── CLÁUSULA 8 ──────────────────────────────────────────────────────────
    {
        id: "clause8",
        title: "8. Operación",
        icon: "fa-truck-fast",
        description: "Cláusula 8: Planificación y control operacional, preparación y respuesta a emergencias.",
        questions: [
            // 8.1
            { id: "q8_1_1", clause: "8", subsection: "8.1", text: "¿Están documentados los procedimientos operacionales clave que tratan los factores de desempeño en SV identificados?", evidence: "Procedimientos de: inspección pre-viaje, gestión de fatiga, control de velocidad, manejo de carga, protocolo en caso de accidente" },
            { id: "q8_1_2", clause: "8", subsection: "8.1", text: "¿Se aplican los controles operacionales en campo? Solicite ver registros de la última semana.", evidence: "Listas de verificación pre-viaje firmadas, registros de despacho con validación de aptitud del conductor" },
            { id: "q8_1_3", clause: "8", subsection: "8.1", text: "¿Cómo se gestionan los cambios planificados y no planificados en operaciones (nueva ruta, sustitución de conductor, falla de unidad)?", evidence: "Procedimiento de gestión de cambios, registros de cambios autorizados con evaluación de impacto en SV" },
            { id: "q8_1_4", clause: "8", subsection: "8.1", text: "¿Cómo se asegura el control de los procesos contratados externamente (talleres, transportistas subcontratados, agencias de conductores)?", evidence: "Contratos con cláusulas de SV, evaluación de proveedores en materia de SV, auditorías a subcontratistas" },
            // 8.2
            { id: "q8_2_1", clause: "8", subsection: "8.2", text: "¿Existe un procedimiento documentado de respuesta ante accidentes de tráfico con muerte o heridas graves?", evidence: "Procedimiento de respuesta a emergencias viales con cadena de notificación y responsables definidos" },
            { id: "q8_2_2", clause: "8", subsection: "8.2", text: "¿Se han realizado simulacros o ensayos del procedimiento de respuesta a emergencias? ¿Con qué frecuencia?", evidence: "Registros de simulacros, evaluación de resultados y acciones de mejora derivadas" },
            { id: "q8_2_3", clause: "8", subsection: "8.2", text: "¿El procedimiento de emergencia contempla la notificación a autoridades, aseguradoras y a la alta dirección?", evidence: "Directorio de emergencias actualizado, flujograma de notificación incluido en el procedimiento" },
        ]
    },

    // ── CLÁUSULA 9 ──────────────────────────────────────────────────────────
    {
        id: "clause9",
        title: "9. Evaluación del desempeño",
        icon: "fa-chart-line",
        description: "Cláusula 9: Seguimiento, medición, investigación de incidentes, auditoría interna y revisión por la dirección.",
        questions: [
            // 9.1
            { id: "q9_1_1", clause: "9", subsection: "9.1", text: "¿Cuáles son los indicadores de desempeño en SV que monitorea la organización? ¿Con qué frecuencia?", evidence: "Tablero de indicadores SV: tasa de siniestralidad, excesos de velocidad, km sin accidente, % inspecciones completadas" },
            { id: "q9_1_2", clause: "9", subsection: "9.1", text: "¿Los métodos de medición garantizan resultados válidos y confiables? ¿Los equipos están calibrados?", evidence: "Certificados de calibración de tacógrafos, alcoholímetros y equipos GPS" },
            { id: "q9_1_3", clause: "9", subsection: "9.1", text: "¿Existe un proceso para evaluar periódicamente el cumplimiento de los requisitos legales en materia de SV?", evidence: "Checklist de cumplimiento legal actualizado, registros de evaluaciones con fechas y responsable" },
            { id: "q9_1_4", clause: "9", subsection: "9.1", text: "¿Se conservan registros de los resultados de seguimiento y medición como evidencia?", evidence: "Reportes mensuales o trimestrales de desempeño SV archivados y disponibles" },
            // 9.2
            { id: "q9_2_1", clause: "9", subsection: "9.2", text: "¿Existe un procedimiento para registrar, investigar y analizar accidentes e incidentes de tráfico?", evidence: "Procedimiento de investigación de incidentes de tráfico documentado y vigente" },
            { id: "q9_2_2", clause: "9", subsection: "9.2", text: "¿Se realizan investigaciones para determinar los factores subyacentes que la organización puede controlar?", evidence: "Informes de investigación con análisis de causa raíz (los últimos 3 accidentes o incidentes graves)" },
            { id: "q9_2_3", clause: "9", subsection: "9.2", text: "¿Las investigaciones se realizan oportunamente? ¿Hay un plazo definido para iniciarlas?", evidence: "Fechas de ocurrencia vs. fechas de inicio de investigación en los informes revisados" },
            { id: "q9_2_4", clause: "9", subsection: "9.2", text: "¿Las necesidades de acciones correctivas y oportunidades preventivas identificadas en las investigaciones se dan seguimiento?", evidence: "Plan de acciones derivado de investigaciones, con estado de implementación y verificación de eficacia" },
            // 9.3
            { id: "q9_3_1", clause: "9", subsection: "9.3", text: "¿Existe un programa anual de auditorías internas del SGSV? ¿Se ha ejecutado conforme a lo planificado?", evidence: "Programa de auditorías con frecuencia, alcance y fechas. Comparativo planificado vs. ejecutado" },
            { id: "q9_3_2", clause: "9", subsection: "9.3", text: "¿Los auditores internos son objetivos e imparciales? ¿Tienen la competencia necesaria?", evidence: "Perfil de auditores, evidencia de formación como auditor interno, declaración de imparcialidad" },
            { id: "q9_3_3", clause: "9", subsection: "9.3", text: "¿Los informes de auditoría se comunican a la dirección pertinente? ¿Se da seguimiento a los hallazgos?", evidence: "Informes de auditoría con hallazgos, no conformidades y plan de acciones correctivas con fechas de cierre" },
            // 9.4
            { id: "q9_4_1", clause: "9", subsection: "9.4", text: "¿La alta dirección revisa el SGSV a intervalos planificados? ¿Con qué frecuencia se realiza?", evidence: "Acta formal de revisión por la dirección con fecha, asistentes y todos los puntos de la norma cubiertos" },
            { id: "q9_4_2", clause: "9", subsection: "9.4", text: "¿La revisión incluye análisis del desempeño en SV, resultados de auditorías, estado de acciones previas y oportunidades de mejora?", evidence: "Agenda y minuta de revisión con cada punto requerido por §9.4 de la norma" },
            { id: "q9_4_3", clause: "9", subsection: "9.4", text: "¿Las decisiones de la revisión por la dirección incluyen compromisos de recursos y cambios necesarios al SGSV?", evidence: "Compromisos y acuerdos registrados en el acta con responsable y fecha de cumplimiento" },
        ]
    },

    // ── CLÁUSULA 10 ─────────────────────────────────────────────────────────
    {
        id: "clause10",
        title: "10. Mejora",
        icon: "fa-arrow-trend-up",
        description: "Cláusula 10: No conformidades, acciones correctivas y mejora continua.",
        questions: [
            // 10.1
            { id: "q10_1_1", clause: "10", subsection: "10.1", text: "¿Existe un procedimiento para gestionar las no conformidades del SGSV? ¿Cómo se registran y tratan?", evidence: "Procedimiento de no conformidades y acciones correctivas, formato de reporte de no conformidad" },
            { id: "q10_1_2", clause: "10", subsection: "10.1", text: "¿Todas las no conformidades detectadas en el último año tienen causa raíz identificada y acción correctiva implementada?", evidence: "Registro de no conformidades con análisis de causa raíz, acción implementada y verificación de eficacia" },
            { id: "q10_1_3", clause: "10", subsection: "10.1", text: "¿Se revisa la eficacia de las acciones correctivas tomadas? ¿Cómo se verifica que la no conformidad no vuelve a ocurrir?", evidence: "Registros de verificación de eficacia, indicadores de recurrencia de no conformidades" },
            { id: "q10_1_4", clause: "10", subsection: "10.1", text: "¿Se analiza si existen no conformidades similares o potenciales en otras áreas o procesos cuando se detecta una?", evidence: "Evidencia de extensión del análisis a otros procesos (análisis de tendencias, revisión horizontal)" },
            // 10.2
            { id: "q10_2_1", clause: "10", subsection: "10.2", text: "¿Cómo demuestra la organización que mejora continuamente la idoneidad, adecuación y eficacia del SGSV?", evidence: "Comparativo de indicadores SV año vs. año anterior, proyectos de mejora documentados e implementados" },
            { id: "q10_2_2", clause: "10", subsection: "10.2", text: "¿Las mejoras implementadas provienen de múltiples fuentes (auditorías, revisión por la dirección, investigación de incidentes, análisis de riesgos)?", evidence: "Registro de mejoras con fuente de origen identificada, trazabilidad desde la detección hasta el cierre" },
        ]
    }
];
