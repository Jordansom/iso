// data.js - VERSIÓN COMPLETA (173 PREGUNTAS)

// Recomendación general que aparecerá siempre en el PDF
const generalRecommendation = "Para cumplir con ISO 39001:2012, la clave es alinear la operación real con un sistema ordenado. Se ha detectado que la organización debe trabajar en cerrar las brechas documentales y operativas detectadas en esta evaluación para garantizar la seguridad vial y la conformidad con la norma.";

const evaluationData = [
    {
        id: "context",
        title: "Contexto y Dirección",
        icon: "fa-sitemap",
        description: "Cláusulas 4, 5, 6.3, 6.4, 7.1 y 9.4 (Contexto, Liderazgo, Planeación).",
        recommendation: "Reforzar el conocimiento del contexto por parte de la alta dirección y asegurar que la política de seguridad vial baje a todos los niveles operativos.",
        questions: [
            // 4.1
            { id: "c1", text: "4.1 ¿La alta dirección conoce el contexto interno y externo que influye en el desempeño del sistema de seguridad vial?" },
            { id: "c2", text: "4.1 ¿Se identifican factores relevantes (operativos, legales, tecnológicos, sociales) que impactan la seguridad vial?" },
            // 4.2
            { id: "c3", text: "4.2 ¿La organización identifica a sus partes interesadas relevantes en seguridad vial?" },
            { id: "c4", text: "4.2 ¿Se conocen y revisan periódicamente las necesidades y expectativas de dichas partes interesadas?" },
            // 4.3
            { id: "c5", text: "4.3 ¿El alcance del sistema de gestión de seguridad vial está claramente definido y documentado?" },
            { id: "c6", text: "4.3 ¿La dirección revisa que el alcance incluya procesos, ubicaciones y actividades relevantes?" },
            // 4.4
            { id: "c7", text: "4.4 ¿La organización identifica cuáles son sus procesos y la interacción entre ellos?" },
            { id: "c8", text: "4.4 ¿Se asignan recursos suficientes para operar el sistema de manera efectiva?" },
            { id: "c9", text: "4.4 ¿La organización cuenta con fichas de procesos?" },
            // 5.1
            { id: "c10", text: "5.1 ¿La dirección demuestra compromiso visible con la mejora del desempeño en seguridad vial?" },
            { id: "c11", text: "5.1 ¿La dirección participa activamente en decisiones estratégicas relacionadas con el sistema de gestión?" },
            { id: "c12", text: "5.1 ¿Se asegura la integración de los requisitos del SGSV en los procesos de negocio?" },
            // 5.2
            { id: "c13", text: "5.2 ¿La política de seguridad vial está establecida, documentada y comunicada internamente?" },
            { id: "c14", text: "5.2 ¿La política es coherente con los objetivos y compromisos de la organización?" },
            { id: "c15", text: "5.2 ¿El personal comprende la política y su aplicación en el trabajo?" },
            // 5.3
            { id: "c16", text: "5.3 ¿La organización cuenta con un organigrama general?" },
            { id: "c17", text: "5.3 ¿Están claramente definidos y documentados los roles y responsabilidades en materia de seguridad vial?" },
            { id: "c18", text: "5.3 ¿El personal conoce sus responsabilidades específicas dentro del SGSV?" },
            { id: "c19", text: "5.3 ¿La dirección asigna autoridades suficientes para la toma de decisiones relacionadas con la seguridad vial?" },
            // 6.3
            { id: "c20", text: "6.3 ¿La organización mide el número de muertos y heridos graves por accidentes viales?" },
            { id: "c21", text: "6.3 ¿La dirección identifica y considera factores clave que afectan el desempeño en seguridad vial?" },
            { id: "c22", text: "6.3 ¿Estos factores se reflejan en la planificación, objetivos y controles operativos?" },
            // 6.4
            { id: "c23", text: "6.4 ¿La dirección establece objetivos claros, medibles y coherentes con la política de seguridad vial?" },
            { id: "c24", text: "6.4 ¿Existen planes definidos para cumplir los objetivos, incluyendo recursos, responsables y plazos?" },
            { id: "c25", text: "6.4 ¿Los resultados de los objetivos se revisan periódicamente?" },
            // 7.1
            { id: "c26", text: "7.1 ¿La dirección promueve la coordinación entre áreas que intervienen en la seguridad vial?" },
            { id: "c27", text: "7.1 ¿Existe comunicación efectiva entre los distintos procesos clave del sistema?" },
            // 9.4
            { id: "c28", text: "9.4 ¿La alta dirección revisa el desempeño del SGSV en intervalos planificados?" },
            { id: "c29", text: "9.4 ¿La revisión incluye resultados de auditorías, desempeño operativo, incidentes y cumplimiento de objetivos?" },
            { id: "c30", text: "9.4 ¿Se toman decisiones y acciones que impulsen la mejora continua del sistema?" },
            { id: "c31", text: "9.4 ¿La revisión deja evidencia documentada de análisis, conclusiones y compromisos?" }
        ]
    },
    {
        id: "logistics",
        title: "Logística e Inspección",
        icon: "fa-truck-fast",
        description: "Cláusulas 6.1, 6.2, 6.3, 8.1 y 9.1 (Gestión Operativa).",
        recommendation: "Formalizar los controles de fatiga (descansos) y asegurar que las inspecciones pre-viaje sean un filtro real para detener unidades no aptas.",
        questions: [
            // 6.1
            { id: "l1", text: "6.1 ¿La organización ha planificado el proceso logístico e inspecciones considerando los requisitos y objetivos del sistema de seguridad vial?" },
            { id: "l2", text: "6.1 ¿Las actividades de logística e inspección están claramente definidas, documentadas y comunicadas?" },
            { id: "l3", text: "6.1 ¿La planificación considera recursos, responsabilidades y tiempos para asegurar una operación segura?" },
            // 6.2
            { id: "l4", text: "6.2 ¿La organización ha identificado riesgos y oportunidades asociados a la operación logística y las inspecciones vehiculares?" },
            { id: "l5", text: "6.2 ¿Existen controles o acciones implementadas para reducir riesgos críticos durante la operación?" },
            { id: "l6", text: "6.2 ¿El personal conoce los riesgos principales de la operación y las acciones para mitigarlos?" },
            // 6.3 Operativo
            { id: "l7", text: "6.3 ¿La organización cuenta con un inventario de los tipos de vehículos con los que trabajan?" },
            { id: "l8", text: "6.3 ¿La organización considera la renovación de su flotilla de unidades (al menos de 5 años atrás)?" },
            { id: "l9", text: "6.3 ¿La organización exige el uso de la bitácora de servicio?" },
            { id: "l10", text: "6.3 ¿La organización cuenta con un programa de descansos para sus operadores?" },
            { id: "l11", text: "6.3 ¿La organización cuenta con un programa aleatorio de pruebas de antidoping y/o alcoholímetro?" },
            { id: "l12", text: "6.3 ¿La organización cuenta con un médico 24/7 para la atención y seguimiento de sus operadores?" },
            { id: "l13", text: "6.3 ¿El proceso considera factores clave de desempeño en seguridad vial (estado del vehículo, ruta, conductor)?" },
            { id: "l14", text: "6.3 ¿Estos factores se integran en las inspecciones previas y en la planificación logística?" },
            { id: "l15", text: "6.3 ¿La organización usa estos factores para orientar mejoras en la operación?" },
            { id: "l16", text: "6.3 ¿La organización cuenta con un procedimiento sobre la retirada de vehículos y conductores no aptos para la red vial?" },
            // 8.1
            { id: "l17", text: "8.1 ¿Las inspecciones previas a la operación se realizan conforme a procedimientos establecidos?" },
            { id: "l18", text: "8.1 ¿La planificación logística contempla rutas, horarios, condiciones de viaje y restricciones de seguridad vial?" },
            { id: "l19", text: "8.1 ¿Los vehículos se retiran de operación cuando no cumplen condiciones seguras?" },
            { id: "l20", text: "8.1 ¿El personal operativo conoce y aplica los lineamientos de control operacional?" },
            { id: "l21", text: "8.1 ¿La ejecución logística se monitorea para detectar desviaciones en ruta, velocidad o condiciones operativas?" },
            // 9.1
            { id: "l22", text: "9.1 ¿La organización realiza seguimiento sistemático a los resultados de las inspecciones y la operación logística?" },
            { id: "l23", text: "9.1 ¿Se miden indicadores relevantes del proceso (desviaciones operativas, fallas detectadas, cumplimiento de inspecciones)?" },
            { id: "l24", text: "9.1 ¿Los datos recolectados son fiables y se registran adecuadamente?" },
            { id: "l25", text: "9.1 ¿Se analizan tendencias para identificar áreas de mejora en logística e inspección?" },
            { id: "l26", text: "9.1 ¿Los resultados del seguimiento se comunican a las áreas responsables y se usan para mejorar la seguridad vial?" },
            { id: "l27", text: "9.1 ¿El proceso se evalúa periódicamente para verificar su eficacia y alineación con los objetivos de seguridad vial?" }
        ]
    },
    {
        id: "monitoring",
        title: "Monitoreo",
        icon: "fa-desktop",
        description: "Cláusulas 8.1, 8.2 y 9.1 (Control Telemático).",
        recommendation: "Asegurar que el monitoreo sea en tiempo real y que existan protocolos claros de escalamiento ante alertas de emergencia.",
        questions: [
            // 8.1
            { id: "mo1", text: "8.1 ¿La organización ha definido qué aspectos operativos deben ser monitoreados para asegurar la seguridad vial?" },
            { id: "mo2", text: "8.1 ¿El monitoreo operativo se realiza conforme a procedimientos o planes establecidos?" },
            { id: "mo3", text: "8.1 ¿El personal encargado del monitoreo conoce sus responsabilidades y criterios de control?" },
            { id: "mo4", text: "8.1 ¿Se cuenta con herramientas adecuadas para realizar el monitoreo (GPS, reportes, sistemas, listas de verificación)?" },
            { id: "mo5", text: "8.1 ¿El monitoreo permite identificar oportunamente desviaciones que puedan afectar la seguridad vial?" },
            // 8.2
            { id: "mo6", text: "8.2 ¿El proceso de monitoreo está diseñado para detectar señales que puedan indicar una posible emergencia vial?" },
            { id: "mo7", text: "8.2 ¿El personal de monitoreo sabe cómo actuar y a quién notificar cuando se identifica una situación que puede convertirse en emergencia?" },
            { id: "mo8", text: "8.2 ¿Los sistemas de monitoreo permiten una detección inmediata o en tiempo real de eventos críticos?" },
            { id: "mo9", text: "8.2 ¿Los hallazgos del monitoreo relacionados con emergencias se registran y comunican adecuadamente?" },
            { id: "mo10", text: "8.2 ¿La información generada por el monitoreo se usa para mejorar los procedimientos de preparación y respuesta a emergencias?" },
            // 9.1
            { id: "mo11", text: "9.1 ¿La organización realiza seguimiento sistemático de los datos generados por el monitoreo (cumplimiento de rutas, desvíos, velocidad, incidentes)?" },
            { id: "mo12", text: "9.1 ¿Existen indicadores definidos para medir el desempeño del proceso de monitoreo?" },
            { id: "mo13", text: "9.1 ¿Los datos registrados son confiables y se gestionan de manera adecuada?" },
            { id: "mo14", text: "9.1 ¿Se analizan los resultados del monitoreo para identificar tendencias o problemas recurrentes?" },
            { id: "mo15", text: "9.1 ¿Los resultados del seguimiento y análisis se utilizan para tomar decisiones y fortalecer el control operacional?" },
            { id: "mo16", text: "9.1 ¿Las áreas responsables reciben oportunamente la información derivada del análisis del monitoreo?" },
            { id: "mo17", text: "9.1 ¿El proceso de monitoreo se evalúa periódicamente para verificar su eficacia y relevancia?" }
        ]
    },
    {
        id: "maintenance",
        title: "Mantenimiento",
        icon: "fa-wrench",
        description: "Cláusulas 7.2, 8.1 y 9.1 (Gestión de Flota).",
        recommendation: "Garantizar recursos suficientes para mantenimiento preventivo y asegurar que la falta de presupuesto no comprometa la seguridad activa de las unidades.",
        questions: [
            // 7.2
            { id: "ma1", text: "7.2 ¿La organización ha determinado los recursos necesarios para asegurar que las actividades de mantenimiento apoyen la seguridad vial?" },
            { id: "ma2", text: "7.2 ¿Los recursos asignados al proceso (personal, herramientas, equipos, instalaciones, presupuesto) son suficientes para cumplir con las actividades programadas?" },
            // PREGUNTA INVERSA (La respuesta ideal es NO)
            { id: "ma3", text: "7.2 ¿Existen limitaciones de recursos que afecten la ejecución del mantenimiento preventivo o correctivo?", isInverse: true },
            { id: "ma4", text: "7.2 ¿Las instalaciones donde se realiza el mantenimiento cumplen con condiciones adecuadas de seguridad, orden y funcionalidad?" },
            { id: "ma5", text: "7.2 ¿Las herramientas y equipos de diagnóstico están disponibles, en buen estado y calibrados cuando aplica?" },
            { id: "ma6", text: "7.2 ¿Existe un control para garantizar que los equipos de mantenimiento estén operativos y no representen riesgos?" },
            // 8.1
            { id: "ma7", text: "8.1 ¿La organización cuenta con un procedimiento de mantenimientos?" },
            { id: "ma8", text: "8.1 ¿La organización cuenta con un procedimiento de seguridad activa y pasiva de sus vehículos?" },
            { id: "ma9", text: "8.1 ¿La organización dispone de un programa de mantenimiento preventivo basado en condiciones de uso, kilometraje o recomendaciones del fabricante?" },
            { id: "ma10", text: "8.1 ¿El proceso de mantenimiento incluye criterios para priorizar intervenciones que impactan la seguridad vial?" },
            { id: "ma11", text: "8.1 ¿Los recursos necesarios para cumplir el plan de mantenimiento están previstos y asignados oportunamente?" },
            { id: "ma12", text: "8.1 ¿Se registran todas las actividades de mantenimiento realizadas a los vehículos?" },
            // 9.1
            { id: "ma13", text: "9.1 ¿Se revisan indicadores clave del proceso de mantenimiento (cumplimiento del plan, disponibilidad de vehículos, fallas críticas, auxilios viales)?" },
            { id: "ma14", text: "9.1 ¿La organización analiza fallas recurrentes para determinar si se requieren más recursos o ajustes al plan de mantenimiento?" },
            { id: "ma15", text: "9.1 ¿La organización evalúa periódicamente la eficiencia del uso de recursos destinados al mantenimiento?" },
            { id: "ma16", text: "9.1 ¿Se han implementado acciones de mejora cuando se detectan deficiencias en la disponibilidad o calidad de los recursos?" },
            { id: "ma17", text: "9.1 ¿Los resultados de auditorías, revisiones de la dirección o incidentes viales derivan en ajustes del proceso de mantenimiento?" }
        ]
    },
    {
        id: "hr",
        title: "Capacitación y RRHH",
        icon: "fa-user-graduate",
        description: "Cláusulas 7.2, 7.3, 7.4, 7.5 y 9.1 (Factor Humano).",
        recommendation: "Fortalecer la verificación de competencias antes de la contratación y asegurar que la capacitación sea continua y registrada.",
        questions: [
            // 7.2
            { id: "hr1", text: "7.2 ¿La organización cuenta con los recursos necesarios (personal, presupuesto, materiales) para realizar el reclutamiento y la capacitación adecuadamente?" },
            { id: "hr2", text: "7.2 ¿Los recursos asignados son suficientes para asegurar la formación continua del personal que impacta la seguridad vial?" },
            { id: "hr3", text: "7.2 ¿Los recursos para capacitación (instructores, equipos, materiales) se mantienen disponibles y actualizados?" },
            // 7.3
            { id: "hr4", text: "7.3 ¿Los requisitos de competencia para cada puesto relacionado con seguridad vial están definidos claramente?" },
            { id: "hr5", text: "7.3 ¿Se verifica que los candidatos cumplen con los requisitos de competencia antes de ser contratados?" },
            { id: "hr6", text: "7.3 ¿El personal recibe capacitación para mantener o mejorar su competencia en temas relacionados con la seguridad vial?" },
            { id: "hr7", text: "7.3 ¿Existen registros que demuestren la competencia del personal (evaluaciones, certificados, entrenamientos)?" },
            // 7.4
            { id: "hr8", text: "7.4 ¿Los trabajadores comprenden cómo su trabajo impacta la seguridad vial dentro de la organización?" },
            { id: "hr9", text: "7.4 ¿El personal conoce la política, objetivos y responsabilidades relacionadas con la seguridad vial?" },
            { id: "hr10", text: "7.4 ¿Los colaboradores entienden las consecuencias de no cumplir con los procedimientos y requisitos de seguridad vial?" },
            { id: "hr11", text: "7.4 ¿La inducción y capacitación refuerzan la responsabilidad individual en la prevención de incidentes?" },
            // 7.5
            { id: "hr12", text: "7.5 ¿La organización comunica de manera clara la información relevante sobre seguridad vial al personal nuevo y existente?" },
            { id: "hr13", text: "7.5 ¿Los trabajadores conocen los canales para reportar incidentes, riesgos o dudas relacionadas con la seguridad vial?" },
            { id: "hr14", text: "7.5 ¿Se difunden mensajes, instrucciones y actualizaciones relacionadas con seguridad vial a través de canales adecuados?" },
            { id: "hr15", text: "7.5 ¿Los contratistas y personal externo reciben la misma información relevante en materia de comunicación y seguridad vial?" },
            // 9.1
            { id: "hr16", text: "9.1 ¿La organización realiza seguimiento al desempeño del personal capacitado (evaluaciones, indicadores de desempeño)?" },
            { id: "hr17", text: "9.1 ¿Se miden aspectos clave del proceso de capacitación y reclutamiento (cumplimiento de programas, efectividad de cursos)?" },
            { id: "hr18", text: "9.1 ¿Los datos recopilados del proceso son fiables y están debidamente registrados?" },
            { id: "hr19", text: "9.1 ¿Se analizan los resultados para identificar tendencias o necesidades de mejora en capacitación y reclutamiento?" },
            { id: "hr20", text: "9.1 ¿La información obtenida se utiliza para mejorar los planes de formación y los criterios de selección del personal?" },
            { id: "hr21", text: "9.1 ¿El proceso de capacitación y reclutamiento se evalúa periódicamente para verificar su eficacia?" }
        ]
    },
    {
        id: "audit",
        title: "Auditorías Internas",
        icon: "fa-clipboard-check",
        description: "Cláusula 9.3 (Verificación).",
        recommendation: "Asegurar la independencia de los auditores y que los hallazgos deriven siempre en un plan de acción formal.",
        questions: [
            { id: "au1", text: "9.3 ¿La organización cuenta con un procedimiento de auditorías internas?" },
            { id: "au2", text: "9.3 ¿Existe un programa de auditorías internas que cubra el alcance del Sistema de Gestión de Seguridad Vial?" },
            { id: "au3", text: "9.3 ¿La planificación considera la importancia de los procesos y los resultados de auditorías previas?" },
            { id: "au4", text: "9.3 ¿El programa define frecuencia, métodos y responsabilidades?" },
            { id: "au5", text: "9.3 ¿Los auditores internos cuentan con competencias necesarias para realizar auditorías del sistema de seguridad vial?" },
            { id: "au6", text: "9.3 ¿Se garantiza que los auditores sean independientes del área o actividad que auditan?" },
            { id: "au7", text: "9.3 ¿Existen registros de capacitación o formación de los auditores?" },
            { id: "au8", text: "9.3 ¿Las auditorías se realizan conforme a lo planificado?" },
            { id: "au9", text: "9.3 ¿Los auditores aplican criterios claros y definidos para evaluar el cumplimiento del sistema de gestión?" },
            { id: "au10", text: "9.3 ¿Se recopilan evidencias suficientes para respaldar los resultados de la auditoría?" },
            { id: "au11", text: "9.3 ¿Los resultados de las auditorías internas se documentan adecuadamente en informes?" },
            { id: "au12", text: "9.3 ¿Se registran las no conformidades, observaciones o áreas de mejora detectadas?" },
            { id: "au13", text: "9.3 ¿Los informes de auditoría se distribuyen a las personas responsables?" },
            { id: "au14", text: "9.3 ¿Se revisa periódicamente la eficacia del proceso de auditorías internas?" },
            { id: "au15", text: "9.3 ¿Los resultados de auditorías previas se utilizan para mejorar el programa de auditorías?" },
            { id: "au16", text: "9.3 ¿La alta dirección recibe información sobre el desempeño del proceso de auditoría interna?" }
        ]
    },
    {
        id: "improvement",
        title: "Mejora Continua",
        icon: "fa-arrow-trend-up",
        description: "Cláusulas 10.1 y 10.2 (Acciones Correctivas).",
        recommendation: "Implementar análisis de causa raíz profundos para evitar la recurrencia de no conformidades.",
        questions: [
            // 10.1
            { id: "im1", text: "10.1 ¿La organización cuenta con un procedimiento de no conformidades y acciones correctivas?" },
            { id: "im2", text: "10.1 ¿Se analizan las causas de cada no conformidad de manera estructurada y objetiva? (Método de análisis)" },
            { id: "im3", text: "10.1 ¿Las acciones correctivas están claramente definidas, con responsables y plazos establecidos?" },
            { id: "im4", text: "10.1 ¿La organización da seguimiento al cumplimiento e implementación de las acciones correctivas?" },
            { id: "im5", text: "10.1 ¿Se verifica la eficacia de las acciones correctivas para evitar la recurrencia de las no conformidades?" },
            { id: "im6", text: "10.1 ¿Se comunican y registran adecuadamente las no conformidades y las acciones tomadas?" },
            // 10.2
            { id: "im7", text: "10.2 ¿La organización utiliza los resultados de las auditorías internas para identificar oportunidades de mejora?" },
            { id: "im8", text: "10.2 ¿Se analizan tendencias o patrones derivados de auditorías anteriores para impulsar mejoras?" },
            { id: "im9", text: "10.2 ¿Las acciones de mejora identificadas se planifican, implementan y siguen adecuadamente?" },
            { id: "im10", text: "10.2 ¿La organización evalúa si las mejoras implementadas realmente fortalecen el desempeño del sistema de gestión?" },
            { id: "im11", text: "10.2 ¿La alta dirección recibe información sobre oportunidades de mejora derivadas de las auditorías internas?" },
            { id: "im12", text: "10.2 ¿Las lecciones aprendidas en auditorías previas se integran para mejorar los métodos, criterios o frecuencia de auditorías?" }
        ]
    },
    {
        id: "emergency",
        title: "Siniestros y Emergencias",
        icon: "fa-truck-medical",
        description: "Cláusulas 8.2, 9.1 y 9.2 (Respuesta e Investigación).",
        recommendation: "Documentar exhaustivamente las investigaciones de accidentes y verificar que las lecciones aprendidas se incorporen a la operación.",
        questions: [
            // 8.2
            { id: "em1", text: "8.2 ¿La organización cuenta con procedimientos establecidos para atender emergencias viales y siniestros?" },
            { id: "em2", text: "8.2 ¿El personal conoce el protocolo de actuación, comunicación y escalamiento ante emergencias?" },
            { id: "em3", text: "8.2 ¿Existen recursos disponibles (contactos, equipos, información) para atender oportunamente un siniestro?" },
            { id: "em4", text: "8.2 ¿Los procedimientos describen claramente roles, responsabilidades y pasos a seguir en caso de emergencia?" },
            { id: "em5", text: "8.2 ¿La organización ha identificado y documentado los tipos de emergencias viales posibles en su operación?" },
            { id: "em6", text: "8.2 ¿Se realiza capacitación o sensibilización al personal sobre cómo actuar en caso de incidentes o emergencias?" },
            // 9.1
            { id: "em7", text: "9.1 ¿La organización recopila y registra información de todos los siniestros e incidentes atendidos?" },
            { id: "em8", text: "9.1 ¿Se miden indicadores clave como número de siniestros, severidad, tiempos de respuesta o reincidencias?" },
            { id: "em9", text: "9.1 ¿Los datos generados por la atención a siniestros son confiables, completos y están bien documentados?" },
            { id: "em10", text: "9.1 ¿Se analizan los resultados para identificar tendencias, factores recurrentes o áreas de mejora?" },
            { id: "em11", text: "9.1 ¿La información obtenida se comunica a las áreas responsables y se utiliza para fortalecer la seguridad vial?" },
            { id: "em12", text: "9.1 ¿El proceso se evalúa periódicamente para verificar la eficacia de la respuesta ante emergencias?" },
            // 9.2
            { id: "em13", text: "9.2 ¿La organización realiza investigaciones formales de todos los accidentes e incidentes de tráfico relevantes?" },
            { id: "em14", text: "9.2 ¿Las investigaciones identifican causas raíz y factores contribuyentes de manera estructurada?" },
            { id: "em15", text: "9.2 ¿Se documentan adecuadamente los hallazgos, evidencias y conclusiones de cada investigación?" },
            { id: "em16", text: "9.2 ¿Los resultados de la investigación se utilizan para definir acciones correctivas o preventivas?" },
            { id: "em17", text: "9.2 ¿Se hace seguimiento a la implementación y eficacia de las acciones tomadas tras un siniestro?" },
            { id: "em18", text: "9.2 ¿Las lecciones aprendidas se incorporan en los procedimientos de emergencia, capacitación o controles operativos?" }
        ]
    },
    {
        id: "docs",
        title: "Información Documentada",
        icon: "fa-file-contract",
        description: "Cláusula 7.6 (Control Documental).",
        recommendation: "Establecer una Lista Maestra y asegurar que no existan documentos obsoletos en uso.",
        questions: [
            // 7.6.1
            { id: "doc1", text: "7.6.1 ¿La organización ha definido qué información documentada es necesaria para apoyar el sistema de gestión de seguridad vial?" },
            { id: "doc2", text: "7.6.1 ¿Existe un método para identificar, clasificar y mantener la información documentada del sistema?" },
            { id: "doc3", text: "7.6.1 ¿La información documentada requerida está disponible para quienes la necesitan?" },
            // 7.6.2
            { id: "doc4", text: "7.6.2 ¿La información documentada se crea siguiendo criterios de claridad, integridad y formato definido por la organización?" },
            { id: "doc5", text: "7.6.2 ¿Las actualizaciones de documentos incluyen revisión, aprobación y control de versiones?" },
            { id: "doc6", text: "7.6.2 ¿Las responsabilidades para crear, revisar y aprobar información documentada están claramente establecidas?" },
            { id: "doc7", text: "7.6.2 ¿Los documentos actualizados están disponibles oportunamente para el personal que los utiliza?" },
            // 7.6.3
            { id: "doc8", text: "7.6.3 ¿La organización controla el acceso a documentos para asegurarse de que solo se utilicen versiones vigentes?" },
            { id: "doc9", text: "7.6.3 ¿Se protege la información documentada contra pérdida, uso indebido, deterioro o acceso no autorizado?" },
            { id: "doc10", text: "7.6.3 ¿Los registros se gestionan adecuadamente en cuanto a archivo, identificación, acceso y tiempo de retención?" },
            { id: "doc11", text: "7.6.3 ¿Se asegura que documentos obsoletos sean retirados o identificados para evitar su uso?" },
            { id: "doc12", text: "7.6.3 ¿La información documentada externa necesaria (normas, requisitos legales) está controlada y actualizada?" },
            { id: "doc13", text: "7.6.3 ¿El personal conoce cómo acceder y utilizar la información documentada aplicable a su proceso?" },
            { id: "doc14", text: "7.6.3 ¿La organización cuenta con una lista maestra de documentos?" }
        ]
    }
];