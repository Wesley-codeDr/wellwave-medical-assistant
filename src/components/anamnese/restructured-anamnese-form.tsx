"use client";

import * as React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Copy, User, AlertTriangle, CircleAlert, Check, X, Pill, Search } from "lucide-react";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { AnamneseData, Tri, Vitals, Diagnostico, ICDEntry } from "@/types/anamnese";
import { useToast } from "@/hooks/use-toast";

// -----------------------------------------------------
// Dados clínicos (síndromes, queixas, hipóteses por QP)
// -----------------------------------------------------

const SYNDROMES: Record<string, string[]> = {
  Cardiovascular: [
    "DOR TORÁCICA",
    "PALPITAÇÃO",
    "SÍNCOPE",
    "HIPERTENSÃO SINTOMÁTICA",
    "DOR DORSAL TORÁCICA",
  ],
  Neurológica: [
    "CEFALEIA",
    "DÉFICIT FOCAL",
    "CONVULSÃO",
    "CONFUSÃO/DELIRIUM",
    "TONTURA/VERTIGEM",
    "SÍNCOPE",
    "TRAUMA CRANIANO",
  ],
  Respiratória: ["DISPNEIA", "TOSSE", "HEMOPTISE", "CHIADO"],
  Gastrointestinal: [
    "DOR ABDOMINAL",
    "NÁUSEAS/VÔMITOS",
    "DIARREIA",
    "HEMATÊMESE",
    "MELENA",
    "DISFAGIA",
  ],
  Urológica: ["DISÚRIA", "DOR LOMBAR", "HEMATÚRIA", "RETENÇÃO URINÁRIA"],
  "Ginecológica/Obstétrica": [
    "SANGRAMENTO VAGINAL",
    "DOR PÉLVICA",
    "ENJOO NA GESTAÇÃO",
  ],
  Infecciosa: ["FEBRE", "SÍNDROME GRIPAL", "ERUPÇÃO CUTÂNEA FEBRIL"],
  Trauma: ["POLITRAUMA", "FRATURA SUSPEITA", "QUEIMADURA"],
  Dermatológica: ["LESÃO CUTÂNEA", "CELULITE", "ABSCESSO"],
  Oftalmológica: ["DOR OCULAR", "VISÃO TURVA", "CONJUNTIVITE"],
  Otorrino: ["OTALGIA", "ODINOFAGIA", "EPISTAXE", "RINORREIA"],
  Musculoesquelética: ["DOR MUSCULAR", "ENTORSE", "DOR ARTICULAR"],
  "Tóxica/Alergia": ["INTOXICAÇÃO", "ALERGIA/ANAFILAXIA", "ANIMAL PEÇONHENTO"],
};

const ALL_QP = Object.values(SYNDROMES).flat();

const DX_MAP: Record<string, { dx: string; cid: string }[]> = {
  "DOR TORÁCICA": [
    { dx: "IAM/SCA", cid: "I21.9" },
    { dx: "Embolia pulmonar (TEP)", cid: "I26.9" },
    { dx: "Dissecção de aorta", cid: "I71.0" },
    { dx: "Pericardite aguda", cid: "I30.9" },
    { dx: "Costocondrite", cid: "M94.0" },
    { dx: "Ansiedade", cid: "F41.1" },
  ],
  CEFALEIA: [
    { dx: "Enxaqueca", cid: "G43.0" },
    { dx: "Cefaleia tensional", cid: "G44.2" },
    { dx: "Hemorragia subaracnóidea", cid: "I60.9" },
    { dx: "Meningite", cid: "G03.9" },
    { dx: "Sinusite aguda", cid: "J01.9" },
  ],
  DISPNEIA: [
    { dx: "Asma", cid: "J45.9" },
    { dx: "Pneumonia", cid: "J18.9" },
    { dx: "Insuficiência cardíaca", cid: "I50.9" },
    { dx: "Embolia pulmonar (TEP)", cid: "I26.9" },
    { dx: "Ansiedade", cid: "F41.9" },
  ],
  "DOR ABDOMINAL": [
    { dx: "Apendicite aguda", cid: "K35.8" },
    { dx: "Colecistite aguda", cid: "K81.0" },
    { dx: "Pancreatite aguda", cid: "K85.9" },
    { dx: "Úlcera péptica", cid: "K27.9" },
    { dx: "Cólica renal", cid: "N20.0" },
  ],
  FEBRE: [
    { dx: "Infecção viral", cid: "B34.9" },
    { dx: "Pneumonia", cid: "J18.9" },
    { dx: "Infecção do trato urinário", cid: "N39.0" },
    { dx: "Meningite", cid: "G03.9" },
    { dx: "Sepse", cid: "A41.9" },
  ],
  "SÍNCOPE": [
    { dx: "Síncope vasovagal", cid: "R55" },
    { dx: "Arritmia não especificada", cid: "I49.9" },
    { dx: "Hipotensão ortostática", cid: "I95.1" },
  ],
  PALPITAÇÃO: [
    { dx: "Fibrilação atrial", cid: "I48.9" },
    { dx: "Taquicardia supraventricular", cid: "I47.1" },
    { dx: "Ansiedade", cid: "F41.1" },
  ],
  DISÚRIA: [
    { dx: "Cistite aguda", cid: "N30.0" },
    { dx: "Pielonefrite aguda", cid: "N10" },
    { dx: "ITU não especificada", cid: "N39.0" },
  ],
  "SANGRAMENTO VAGINAL": [
    { dx: "Ameaça de abortamento", cid: "O20.0" },
    { dx: "Gestação ectópica", cid: "O00.9" },
    { dx: "DPP (descolamento prematuro)", cid: "O45.9" },
  ],
  "ALERGIA/ANAFILAXIA": [
    { dx: "Anafilaxia", cid: "T78.2" },
    { dx: "Urticária", cid: "L50.9" },
  ],
  QUEIMADURA: [{ dx: "Queimadura, grau não especificado", cid: "T30.0" }],
  "DOR LOMBAR": [
    { dx: "Lombalgia", cid: "M54.5" },
    { dx: "Cólica renal", cid: "N20.0" },
  ],
  OTALGIA: [{ dx: "Otite média aguda", cid: "H66.9" }],
  ODINOFAGIA: [
    { dx: "Faringite aguda", cid: "J02.9" },
    { dx: "Amigdalite aguda", cid: "J03.9" },
  ],
};

const DURATION_PRESETS = ["agora", "30min", "1h", "6h", "24h", ">72h"] as const;

const COMORB = [
  "HAS",
  "DM",
  "DPOC",
  "IAM",
  "AVE",
  "TEP",
  "TVP",
  "FA",
  "ICC",
  "IRC",
  "NENHUMA",
] as const;

const ALLERGY_LIST = ["PENICILINAS", "AAS", "AINES", "DIPIRONA", "IODO"] as const;

const MUC = [
  "AAS",
  "ATENOLOL",
  "ENALAPRIL",
  "METFORMINA",
  "SINWARFARINA",
  "NENHUM",
] as const;

const MEDS: { id: string; nome: string; classe?: string }[] = [
  { id: "dipirona", nome: "Dipirona" },
  { id: "paracetamol", nome: "Paracetamol" },
  { id: "ondansetrona", nome: "Ondansetrona" },
  { id: "metoclopramida", nome: "Metoclopramida" },
  { id: "ibuprofeno", nome: "Ibuprofeno", classe: "AINE" },
  { id: "enoxaparina", nome: "Enoxaparina" },
];

function checkInteractions(selectedMeds: string[], muc: string[]) {
  const alerts: { pair: string; severity: "grave" | "moderada" | "leve"; note: string }[] = [];
  if (muc.includes("AAS") && selectedMeds.includes("ibuprofeno")) {
    alerts.push({
      pair: "AAS + Ibuprofeno",
      severity: "moderada",
      note: "Risco de redução do efeito antiplaquetário e sangramento. Considerar paracetamol/dipirona.",
    });
  }
  if (selectedMeds.includes("ondansetrona") && selectedMeds.includes("metoclopramida")) {
    alerts.push({
      pair: "Ondansetrona + Metoclopramida",
      severity: "leve",
      note: "Cautela por potencial somatório de efeitos (QT/extrapiramidais). Monitorar.",
    });
  }
  if (selectedMeds.includes("enoxaparina") && muc.includes("AAS")) {
    alerts.push({
      pair: "Enoxaparina + AAS",
      severity: "moderada",
      note: "Aumento do risco hemorrágico. Avaliar risco/benefício e monitorar.",
    });
  }
  return alerts;
}

// -----------------------------------------------------
// CID-10 (dados + busca + cache)
// -----------------------------------------------------

const ICD10_FALLBACK: ICDEntry[] = [
  { code: "I21.9", desc: "Infarto agudo do miocárdio, não especificado" },
  { code: "I26.9", desc: "Embolia pulmonar sem menção de cor pulmonale agudo" },
  { code: "I71.0", desc: "Dissecção de aorta" },
  { code: "I30.9", desc: "Pericardite aguda, não especificada" },
  { code: "M94.0", desc: "Costocondrite" },
  { code: "F41.1", desc: "Transtorno de ansiedade generalizada" },
  { code: "G43.0", desc: "Enxaqueca sem aura" },
  { code: "G44.2", desc: "Cefaleia do tipo tensional" },
  { code: "I60.9", desc: "Hemorragia subaracnóidea, não especificada" },
  { code: "G03.9", desc: "Meningite, não especificada" },
  { code: "J01.9", desc: "Sinusite aguda, não especificada" },
  { code: "J45.9", desc: "Asma, não especificada" },
  { code: "J18.9", desc: "Pneumonia, não especificada" },
  { code: "I50.9", desc: "Insuficiência cardíaca, não especificada" },
  { code: "F41.9", desc: "Transtorno ansioso, não especificado" },
  { code: "K35.8", desc: "Outras apendicites agudas" },
  { code: "K81.0", desc: "Colecistite aguda" },
  { code: "K85.9", desc: "Pancreatite aguda, não especificada" },
  { code: "K27.9", desc: "Úlcera péptica, não especificada" },
  { code: "N20.0", desc: "Cálculo do rim" },
  { code: "B34.9", desc: "Infecção viral de localização não especificada" },
  { code: "N39.0", desc: "Infecção do trato urinário de local não especificado" },
  { code: "A41.9", desc: "Septicemia, não especificada" },
  { code: "R55", desc: "Síncope e colapso" },
  { code: "I49.9", desc: "Arritmia cardíaca, não especificada" },
  { code: "I95.1", desc: "Hipotensão ortostática" },
  { code: "I48.9", desc: "Fibrilação atrial e flutter, não especificados" },
  { code: "I47.1", desc: "Taquicardia supraventricular" },
  { code: "N30.0", desc: "Cistite aguda" },
  { code: "N10", desc: "Pielonefrite aguda" },
  { code: "O20.0", desc: "Ameaça de abortamento" },
  { code: "O00.9", desc: "Gravidez ectópica, não especificada" },
  { code: "O45.9", desc: "Descolamento prematuro da placenta, não especificado" },
  { code: "T78.2", desc: "Choque anafilático, não especificado" },
  { code: "L50.9", desc: "Urticária, não especificada" },
  { code: "T30.0", desc: "Queimadura, grau não especificado" },
  { code: "M54.5", desc: "Dor lombar" },
  { code: "H66.9", desc: "Otite média, não especificada" },
  { code: "J02.9", desc: "Faringite aguda, não especificada" },
  { code: "J03.9", desc: "Amigdalite aguda, não especificada" },
];

const CACHE_KEY = "icd10_cache_v1";
const CID10_REGEX = /^[A-TV-Z][0-9]{2}(?:\.[0-9A-Z]{1,2})?$/; // exclui U; aceita ponto opcional

function letterIndex(ch: string) {
  const i = ch.toUpperCase().charCodeAt(0) - 65; // A=0
  return i;
}
function codeToIdx(code: string) {
  const s = code.toUpperCase().replace(".", "");
  if (!/^[A-Z][0-9]{2}/.test(s)) return null;
  const li = letterIndex(s[0]);
  const n = parseInt(s.slice(1, 3), 10);
  if (isNaN(n)) return null;
  return li * 100 + n; // 0..2599 aprox
}

const ICD_CHAPTERS: { range: string; label: string }[] = [
  { range: "A00-B99", label: "A–B Infecciosas" },
  { range: "C00-D49", label: "C–D Neoplasias" },
  { range: "D50-D89", label: "D50–D89 Sangue/Imune" },
  { range: "E00-E90", label: "E Endócrino/Nutrição" },
  { range: "F00-F99", label: "F Transtornos mentais" },
  { range: "G00-G99", label: "G Sistema nervoso" },
  { range: "H00-H59", label: "H00–H59 Olhos" },
  { range: "H60-H95", label: "H60–H95 Ouvidos" },
  { range: "I00-I99", label: "I Circulatório" },
  { range: "J00-J99", label: "J Respiratório" },
  { range: "K00-K93", label: "K Digestivo" },
  { range: "L00-L99", label: "L Pele" },
  { range: "M00-M99", label: "M Músculo/Esquelético" },
  { range: "N00-N99", label: "N Geniturinário" },
  { range: "O00-O99", label: "O Gravidez/Parto" },
  { range: "P00-P96", label: "P Perinatal" },
  { range: "Q00-Q99", label: "Q Congênitas" },
  { range: "R00-R99", label: "R Sinais/Sintomas" },
  { range: "S00-T98", label: "S–T Lesões/Enven." },
  { range: "V01-Y98", label: "V–Y Causas externas" },
  { range: "Z00-Z99", label: "Z Fatores" },
];

function inRange(code: string, range: string) {
  const [a, b] = range.split("-");
  const ai = codeToIdx(a!);
  const bi = codeToIdx(b!);
  const ci = codeToIdx(code);
  if (ai == null || bi == null || ci == null) return false;
  return ci >= ai && ci <= bi;
}

// -----------------------------------------------------
// UI helper components
// -----------------------------------------------------

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-base font-semibold tracking-tight">{children}</h2>
    </div>
  );
}

function TriState({ value, onChange }: { value: Tri; onChange: (v: Tri) => void }) {
  return (
    <ToggleGroup type="single" value={value} onValueChange={(v) => onChange((v as Tri) || "nd")} className="gap-1">
      <ToggleGroupItem value="yes" className="px-3 text-xs">Sim</ToggleGroupItem>
      <ToggleGroupItem value="no" className="px-3 text-xs">Não</ToggleGroupItem>
      <ToggleGroupItem value="nd" className="px-3 text-xs">Não doc.</ToggleGroupItem>
    </ToggleGroup>
  );
}

function MultiChips({
  options,
  value,
  onChange,
  max,
}: {
  options: string[];
  value: string[];
  onChange: (v: string[]) => void;
  max?: number;
}) {
  // Deduplicate options while preserving order to avoid duplicate React keys
  const uniqueOptions = React.useMemo(() => {
    const seen = new Set<string>();
    const result: string[] = [];
    for (const raw of options) {
      const opt = (raw ?? "").toString().trim();
      if (!seen.has(opt)) {
        seen.add(opt);
        result.push(opt);
      }
    }
    return result;
  }, [options]);

  function toggle(opt: string) {
    const has = value.includes(opt);
    let v = has ? value.filter((x) => x !== opt) : [...value, opt];
    if (max && v.length > max) return; // silently ignore
    onChange(v);
  }
  return (
    <div className="flex flex-wrap gap-2">
      {uniqueOptions.map((opt, idx) => (
        <Button
          key={opt}
          type="button"
          variant={value.includes(opt) ? "default" : "outline"}
          size="sm"
          className="rounded-lg"
          onClick={() => toggle(opt)}
        >
          {opt}
        </Button>
      ))}
    </div>
  );
}

function MultiChipsDx({
  options,
  value,
  onChange,
  max = 3,
}: {
  options: { dx: string; cid: string }[];
  value: { dx: string; cid: string }[];
  onChange: (v: { dx: string; cid: string }[]) => void;
  max?: number;
}) {
  function toggle(opt: { dx: string; cid: string }) {
    const has = value.find((x) => x.dx === opt.dx && x.cid === opt.cid);
    let v = has ? value.filter((x) => !(x.dx === opt.dx && x.cid === opt.cid)) : [...value, opt].slice(0, max);
    onChange(v);
  }
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = value.some((x) => x.dx === opt.dx && x.cid === opt.cid);
        return (
          <Button
            key={`${opt.dx}-${opt.cid}`}
            type="button"
            variant={active ? "default" : "outline"}
            size="sm"
            className="rounded-lg"
            onClick={() => toggle(opt)}
          >
            {opt.dx} — {opt.cid}
          </Button>
        );
      })}
    </div>
  );
}

// -----------------------------------------------------
// Highlight helper (única definição)
// -----------------------------------------------------

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function highlight(text: string, query: string) {
  const q = query.trim();
  if (!q) return <>{text}</>;
  const tokens = Array.from(new Set(q.split(/\s+/).filter(Boolean)));
  if (!tokens.length) return <>{text}</>;
  const re = new RegExp(`(${tokens.map(escapeRegExp).join("|")})`, "gi");
  const parts = text.split(re);
  const matcher = new RegExp(`^(${tokens.map(escapeRegExp).join("|")})$`, "i");
  return (
    <>
      {parts.map((part, i) =>
        matcher.test(part) ? <mark key={i}>{part}</mark> : <React.Fragment key={i}>{part}</React.Fragment>
      )}
    </>
  );
}

// -----------------------------------------------------
// Componente principal
// -----------------------------------------------------

export default function RestructuredAnamneseForm() {
  const { toast } = useToast();
  
  // Demografia
  const [faixa, setFaixa] = React.useState<"PEDIÁTRICO" | "ADULTO" | "IDOSO" | "">("");
  const [sexo, setSexo] = React.useState<"MASCULINO" | "FEMININO" | "">("");
  const [gestante, setGestante] = React.useState<Tri>("nd");
  React.useEffect(() => {
    if (sexo !== "FEMININO" || faixa !== "ADULTO") setGestante("nd");
  }, [sexo, faixa]);

  // Queixa e síndrome
  const [sindrome, setSindrome] = React.useState<string>("");
  const [qp, setQp] = React.useState<string>("");
  const [qpLivre, setQpLivre] = React.useState<string>("");

  // Tempo
  const [tempoPreset, setTempoPreset] = React.useState<string>("");
  const [tempoValor, setTempoValor] = React.useState<number | "">("");
  const [tempoUn, setTempoUn] = React.useState<"min" | "h" | "d">("h");
  const tempoLivre = tempoValor !== "" ? `${tempoValor}${tempoUn}` : "";
  const tempoFinal = tempoPreset || tempoLivre || "";

  // Caracterização
  const [eva, setEva] = React.useState<number>(0);
  const [caraterDor, setCaraterDor] = React.useState<string>("");
  const [fatoresMelhora, setFatoresMelhora] = React.useState<string[]>([]);
  const [fatoresPiora, setFatoresPiora] = React.useState<string[]>([]);
  const [sintomasAssoc, setSintomasAssoc] = React.useState<string[]>([]);

  // Antecedentes
  const [mucs, setMucs] = React.useState<string[]>([]);
  const [comorb, setComorb] = React.useState<string[]>([]);
  const [alergiasTri, setAlergiasTri] = React.useState<Tri>("nd");
  const [alergiasMarcadas, setAlergiasMarcadas] = React.useState<string[]>([]);
  const [negAlarmes, setNegAlarmes] = React.useState<Tri>("nd");

  // EF
  const [vitals, setVitals] = React.useState<Vitals>({});
  const [achadosEF, setAchadosEF] = React.useState<string[]>([]);

  // Hipóteses
  const [hipos, setHipos] = React.useState<{ dx: string; cid: string }[]>([]);
  const [hipoCustomDx, setHipoCustomDx] = React.useState("");
  const [hipoCustomCid, setHipoCustomCid] = React.useState("");

  // CID-10 combobox state
  const [openCid, setOpenCid] = React.useState(false);
  const [icdQuery, setIcdQuery] = React.useState("");
  const [icdIndex, setIcdIndex] = React.useState<ICDEntry[]>(ICD10_FALLBACK);
  const [icdCacheSource, setIcdCacheSource] = React.useState<'fallback' | 'local' | 'remote'>('fallback');
  const [icdChapters, setIcdChapters] = React.useState<string[]>([]);

  // Carregamento do dicionário (cache + fetch)
  React.useEffect(() => {
    // 1) Tenta cache local
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const cached: ICDEntry[] = JSON.parse(raw);
        if (Array.isArray(cached) && cached.length) {
          setIcdIndex(cached);
          setIcdCacheSource('local');
        }
      }
    } catch {}

    // 2) Tenta /icd10.json
    fetch('/icd10.json')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        if (Array.isArray(data)) {
          const norm: ICDEntry[] = data
            .map((e: any) => ({
              code: String(e.code || e.Code || e.CODIGO || e.Codigo || '').toUpperCase(),
              desc: String(e.desc || e.Description || e.title || e.Title || e.Titulo || '').trim(),
            }))
            .filter((e) => e.code && CID10_REGEX.test(e.code) && e.desc);
          if (norm.length) {
            setIcdIndex(norm);
            setIcdCacheSource('remote');
            try { localStorage.setItem(CACHE_KEY, JSON.stringify(norm)); } catch {}
          }
        }
      })
      .catch(() => {
        // mantém fallback/local
      });
  }, []);

  function icdSearch(query: string, chapters: string[]) {
    let list = icdIndex;
    if (chapters.length) {
      list = list.filter((e) => chapters.some((rng) => inRange(e.code, rng)));
    }
    const s = query.trim().toUpperCase();
    if (!s) return list.slice(0, 50);
    return list.filter((e) => e.code.includes(s) || e.desc.toUpperCase().includes(s)).slice(0, 50);
  }

  const icdMatches = React.useMemo(() => icdSearch(icdQuery, icdChapters), [icdQuery, icdChapters, icdIndex]);
  const cidError = React.useMemo(() => !!hipoCustomCid && !CID10_REGEX.test(hipoCustomCid.trim().toUpperCase()), [hipoCustomCid]);

  // Detalhamento
  const [justifs, setJustifs] = React.useState<string[]>([]);
  const [scores, setScores] = React.useState<string[]>([]);

  // Conduta
  const [presc, setPresc] = React.useState<string[]>([]);
  const [orient, setOrient] = React.useState<string[]>([]);
  const [criterios, setCriterios] = React.useState<string[]>([]);
  const [pend, setPend] = React.useState<string[]>([]);

  // Preview controls
  const [uppercase, setUppercase] = React.useState(false);
  const [editPreview, setEditPreview] = React.useState(false);
  const [previewOverride, setPreviewOverride] = React.useState("");

  // Progresso mínimo
  const answered = [!!faixa, !!sexo, !!(qp || qpLivre), !!tempoFinal].filter(Boolean).length;
  const progress = Math.round((answered / 4) * 100);

  // Interações medicamentosas (mock)
  const interacoes = React.useMemo(() => checkInteractions(presc, mucs), [presc, mucs]);

  // Opções dinâmicas
  const qpOptions = sindrome ? SYNDROMES[sindrome] || [] : ALL_QP;
  const dxOptions = React.useMemo(() => {
    if (qp && DX_MAP[qp]) return DX_MAP[qp];
    return [
      ...DX_MAP["DOR TORÁCICA"],
      ...DX_MAP["CEFALEIA"],
      ...DX_MAP["DISPNEIA"],
      ...DX_MAP["DOR ABDOMINAL"],
      ...DX_MAP["FEBRE"],
    ].slice(0, 12);
  }, [qp]);

  // Gerador do preview
  const previewText = React.useMemo(() => {
    const p: string[] = [];

    if (faixa && sexo && (qp || qpLivre) && tempoFinal) {
      const qpFinal = qpLivre || qp;
      p.push(`Paciente ${faixa.toLowerCase()}, ${sexo.toLowerCase()}, procura PS por ${qpFinal.toLowerCase()} com início há ${tempoFinal}.`);
      if (sexo === "FEMININO" && faixa === "ADULTO") {
        if (gestante === "yes") p.push("Gestante: confirma.");
        if (gestante === "no") p.push("Gestante: nega.");
        if (gestante === "nd") p.push("Gestante: não documentado nesta avaliação.");
      }
    }

    if (qp || qpLivre) {
      const evastr = eva ? `intensidade ${eva}/10` : "intensidade não documentada";
      const car = caraterDor || "caráter não documentado";
      const fm = fatoresMelhora.length ? fatoresMelhora.join(", ") : "não documentado";
      const fp = fatoresPiora.length ? fatoresPiora.join(", ") : "não documentado";
      const sa = sintomasAssoc.length ? sintomasAssoc.join(", ") : "não documentados";
      p.push(`Caracterização: ${evastr}, ${car}; fatores de melhora ${fm}; piora ${fp}; sintomas associados ${sa}.`);
    }

    if (negAlarmes === "no") p.push("Nega sinais de alarme pertinentes.");
    if (negAlarmes === "nd") p.push("Sem sinais de alarme documentados até o momento.");

    if (comorb.length) p.push(`Antecedentes: ${comorb.join(", ")}.`);

    if (alergiasTri === "yes" && alergiasMarcadas.length)
      p.push(`Alergias: relata a ${alergiasMarcadas.join(", ")}.`);
    if (alergiasTri === "no") p.push("Alergias: nega.");
    if (alergiasTri === "nd") p.push("Alergias: não documentadas nesta avaliação.");

    if (mucs.length) p.push(`MUC relevantes: ${mucs.join(", ")}.`);

    // Vitals & EF
    const v: string[] = [];
    if (vitals.pa) v.push(`PA ${vitals.pa} mmHg`);
    if (vitals.fc) v.push(`FC ${vitals.fc} bpm`);
    if (vitals.fr) v.push(`FR ${vitals.fr} irpm`);
    if (vitals.tax) v.push(`TAX ${vitals.tax?.toFixed(1)} °C`);
    if (vitals.spo2) v.push(`SpO2 ${vitals.spo2}%`);
    if (v.length) p.push(`Sinais vitais: ${v.join(", ")}.`);

    if (achadosEF.length) p.push(`Exame físico: ${achadosEF.join(", ")}.`);

    // Hipóteses (com CID)
    if (hipos.length) p.push(`Hipóteses diagnósticas: ${hipos.map((h) => `${h.dx} (${h.cid})`).join("; ")}.`);

    // Detalhamento
    const parts: string[] = [];
    if (justifs.length) parts.push(`justificativas ${justifs.join(", ")}`);
    if (scores.length) parts.push(`scores ${scores.join(", ")}`);
    if (parts.length) p.push(`Detalhamento: ${parts.join("; ")}.`);

    // Conduta
    if (presc.length) {
      const alertTxt = interacoes.length
        ? interacoes.map((a) => `${a.pair} (${a.severity}): ${a.note}`).join(" | ")
        : "nenhum alerta grave";
      p.push(
        `Conduta medicamentosa: ${presc
          .map((id) => MEDS.find((m) => m.id === id)?.nome)
          .filter(Boolean)
          .join(", ")}. Alertas de interação: ${alertTxt}.`
      );
    }

    if (orient.length)
      p.push(
        `Orientações: ${orient.join(", ")}. Documento padrão: Paciente orientado sobre sinais de alarme e retorno imediato se necessário. Verbalizou compreensão.`
      );

    if (criterios.length) p.push(`Critérios de alta/internação: ${criterios.join(", ")}.`);

    if (pend.length) p.push(`Pendências: ${pend.join(", ")}.`);

    p.push("Sistema auxiliar – não substitui julgamento clínico médico.");

    const text = p.join("\n\n");
    return uppercase ? text.toUpperCase() : text;
  }, [
    faixa,
    sexo,
    gestante,
    qp,
    qpLivre,
    tempoFinal,
    eva,
    caraterDor,
    fatoresMelhora,
    fatoresPiora,
    sintomasAssoc,
    negAlarmes,
    comorb,
    alergiasTri,
    alergiasMarcadas,
    mucs,
    vitals,
    achadosEF,
    hipos,
    justifs,
    scores,
    presc,
    interacoes,
    orient,
    criterios,
    pend,
    uppercase,
  ]);

  const effectivePreview = editPreview ? previewOverride || previewText : previewText;
  const diverge = editPreview && previewOverride && previewOverride !== previewText;

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {}
  }

  function copySection(kind: "HDA" | "EF" | "HD" | "CONDUTA" | "ORIENT" | "DETALHE" | "TUDO") {
    const lines = (uppercase ? previewText : previewText).split("\n\n");
    const map: Record<string, (ls: string[]) => string> = {
      HDA: (ls) => ls.slice(0, 7).join("\n\n"), // inclui gestante quando aplicável
      EF: (ls) =>
        ls
          .filter(
            (l) =>
              l.toLowerCase().startsWith("exame físico") ||
              l.toLowerCase().startsWith("sinais vitais")
          )
          .join("\n\n"),
      HD: (ls) => ls.find((l) => l.toLowerCase().startsWith("hipóteses")) || "",
      DETALHE: (ls) => ls.find((l) => l.toLowerCase().startsWith("detalhamento")) || "",
      CONDUTA: (ls) => ls.find((l) => l.toLowerCase().startsWith("conduta")) || "",
      ORIENT: (ls) => ls.find((l) => l.toLowerCase().startsWith("orientações")) || "",
      TUDO: (ls) => ls.join("\n\n"),
    };
    
    const sectionNames: Record<string, string> = {
      HDA: "História da Doença Atual",
      EF: "Exame Físico",
      HD: "Hipóteses Diagnósticas",
      DETALHE: "Detalhamento",
      CONDUTA: "Conduta",
      ORIENT: "Orientações",
      TUDO: "Anamnese Completa"
    };
    
    copy(map[kind](lines));
    toast({
      title: "Copiado!",
      description: `${sectionNames[kind]} foi copiado para a área de transferência.`,
    });
  }

  // ---------- UI ----------
  return (
    <main className="flex-1 overflow-auto">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <Card className="card-modern animate-in fade-in-0 slide-in-from-bottom-4">
          <CardHeader className="px-6 pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <User className="h-6 w-6" aria-hidden />
                </div>
                <div>
                  <CardTitle className="flex items-center gap-2">Anamnese PS</CardTitle>
                  <CardDescription>Sistema auxiliar para documentação médica no Pronto-Socorro</CardDescription>
                </div>
              </div>
              <Badge variant="outline">{progress}% completo</Badge>
            </div>
            <Progress value={progress} className="h-2 mt-4" />
          </CardHeader>
        </Card>

        {/* Split panes com divisória arrastável */}
        <PanelGroup direction="horizontal" className="rounded-2xl border animate-in fade-in-0 slide-in-from-bottom-4" style={{ animationDelay: '0.1s' }}>
          <Panel defaultSize={66} minSize={40} className="p-2 md:p-4">
            <div className="space-y-6">
              {/* Tabs 1: Início/Caracterização/Negativas/Antecedentes/Alergias/Medicamentos */}
              <Tabs defaultValue="inicio" className="w-full">
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 sticky top-2 z-20 backdrop-blur">
                  <TabsTrigger value="inicio">Início</TabsTrigger>
                  <TabsTrigger value="caracterizacao">Caracterização</TabsTrigger>
                  <TabsTrigger value="negativas">Negativas</TabsTrigger>
                  <TabsTrigger value="antecedentes">Antecedentes</TabsTrigger>
                  <TabsTrigger value="alergias">Alergias</TabsTrigger>
                  <TabsTrigger value="medicacoes">Medicamentos</TabsTrigger>
                </TabsList>

                <TabsContent value="inicio" className="mt-4">
                  <Card className="rounded-2xl">
                    <CardContent className="p-6 space-y-6">
                      <SectionTitle>Informações Iniciais</SectionTitle>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <Label>Faixa etária</Label>
                          <ToggleGroup type="single" value={faixa} onValueChange={(v) => setFaixa((v as any) || "")}> 
                            <ToggleGroupItem value="PEDIÁTRICO">PEDIÁTRICO</ToggleGroupItem>
                            <ToggleGroupItem value="ADULTO">ADULTO</ToggleGroupItem>
                            <ToggleGroupItem value="IDOSO">IDOSO</ToggleGroupItem>
                          </ToggleGroup>
                        </div>
                        <div className="space-y-2">
                          <Label>Sexo</Label>
                          <ToggleGroup type="single" value={sexo} onValueChange={(v) => setSexo((v as any) || "")}> 
                            <ToggleGroupItem value="MASCULINO">MASCULINO</ToggleGroupItem>
                            <ToggleGroupItem value="FEMININO">FEMININO</ToggleGroupItem>
                          </ToggleGroup>
                        </div>
                        <div className="space-y-2">
                          <Label>Gestante (auto-exibido se feminino adulto)</Label>
                          <div className={cn("flex items-center gap-2", !(sexo === "FEMININO" && faixa === "ADULTO") && "opacity-50 pointer-events-none")}> 
                            <TriState value={gestante} onChange={setGestante} />
                          </div>
                          <p className="text-xs text-muted-foreground">Padrão seguro: "Não doc."</p>
                        </div>
                      </div>

                      <Separator />

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label>Síndrome</Label>
                          <div className="flex flex-wrap gap-2">
                            {Object.keys(SYNDROMES).map((s) => (
                      <Button key={s} size="sm" variant={sindrome === s ? "default" : "outline"} onClick={() => { setSindrome(s); setQp(""); }} className="btn-modern transition-smooth">
                        {s}
                      </Button>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Queixa principal (por síndrome)</Label>
                          <MultiChips options={qpOptions} value={qp ? [qp] : []} onChange={(v) => setQp(v[0] || "")} />
                          <div className="flex items-center gap-2 mt-2">
                            <Input placeholder="Queixa adicional (opcional)" value={qpLivre} onChange={(e) => setQpLivre(e.target.value)} />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Tempo de evolução</Label>
                        <div className="flex flex-wrap gap-2">
                          {DURATION_PRESETS.map((p) => (
                            <Button key={p} size="sm" variant={tempoPreset === p ? "default" : "outline"} onClick={() => { setTempoPreset(p); setTempoValor(""); }}>
                              {p}
                            </Button>
                          ))}
                        </div>
                        <div className="flex items-center gap-2">
                          <Input type="number" placeholder="Valor" className="w-24" value={tempoValor as any} onChange={(e) => { setTempoPreset(""); setTempoValor(e.target.value === "" ? "" : Number(e.target.value)); }} />
                          <select className="border rounded-md h-9 px-2" value={tempoUn} onChange={(e) => setTempoUn(e.target.value as any)} aria-label="Unidade de tempo">
                            <option value="min">min</option>
                            <option value="h">h</option>
                            <option value="d">d</option>
                          </select>
                          <Button variant="default" disabled={!tempoValor && !tempoPreset}>Definir</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="caracterizacao" className="mt-4">
                  <Card className="rounded-2xl">
                    <CardContent className="p-6 space-y-6">
                      <SectionTitle>Caracterização do Quadro</SectionTitle>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label>Intensidade (EVA)</Label>
                          <div className="px-2">
                            <Slider value={[eva]} min={0} max={10} step={1} onValueChange={(v) => setEva(v[0] ?? 0)} />
                            <div className="text-sm text-muted-foreground mt-1">{eva}/10</div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Caráter da dor</Label>
                          <MultiChips options={["PULSÁTIL", "OPRESSIVA", "PONTADA", "QUEIMAÇÃO", "CÓLICA"]} value={caraterDor ? [caraterDor] : []} onChange={(v) => setCaraterDor(v[0] || "")} />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label>Fatores de melhora</Label>
                          <MultiChips options={["REPOUSO", "ANALGÉSICO", "NÃO IDENTIFICADO"]} value={fatoresMelhora} onChange={setFatoresMelhora} />
                        </div>
                        <div className="space-y-2">
                          <Label>Fatores de piora</Label>
                          <MultiChips options={["ESFORÇO", "MOVIMENTO", "ALIMENTAÇÃO", "NÃO IDENTIFICADO"]} value={fatoresPiora} onChange={setFatoresPiora} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Sintomas associados</Label>
                        <MultiChips options={["NÁUSEAS", "VÔMITOS", "FOTOFOBIA", "FEBRE", "DISPNEIA", "SUDORESE", "TOSSE", "SÍNCOPE", "PALPITAÇÃO", "DOR DORSAL"]} value={sintomasAssoc} onChange={setSintomasAssoc} />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="negativas" className="mt-4">
                  <Card className="rounded-2xl">
                    <CardContent className="p-6 space-y-6">
                      <SectionTitle>Negativas Importantes</SectionTitle>
                      <div className="space-y-2">
                        <Label>Sinais de alarme pertinentes</Label>
                        <TriState value={negAlarmes} onChange={setNegAlarmes} />
                        <p className="text-xs text-muted-foreground">Use "Não doc." se não for possível afirmar negações.</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="antecedentes" className="mt-4">
                  <Card className="rounded-2xl">
                    <CardContent className="p-6 space-y-6">
                      <SectionTitle>Antecedentes</SectionTitle>
                      <div className="space-y-2">
                        <Label>Comorbidades (siglas)</Label>
                        <MultiChips options={[...COMORB]} value={comorb} onChange={setComorb} />
                      </div>
                      <div className="space-y-2">
                        <Label>Medicamentos de uso contínuo (MUC)</Label>
                        <MultiChips options={[...MUC]} value={mucs} onChange={setMucs} />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="alergias" className="mt-4">
                  <Card className="rounded-2xl">
                    <CardContent className="p-6 space-y-6">
                      <SectionTitle>Alergias</SectionTitle>
                      <div className="space-y-2">
                        <Label>Declaração</Label>
                        <TriState value={alergiasTri} onChange={setAlergiasTri} />
                      </div>
                      <div className={cn("space-y-2", alergiasTri !== "yes" && "opacity-50 pointer-events-none")}> 
                        <Label>Quais?</Label>
                        <MultiChips options={[...ALLERGY_LIST]} value={alergiasMarcadas} onChange={setAlergiasMarcadas} />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="medicacoes" className="mt-4">
                  <Card className="rounded-2xl">
                    <CardContent className="p-6 space-y-6">
                      <SectionTitle>
                        <span className="flex items-center gap-2"><Pill className="h-4 w-4" /> Prescrição (pré-registrados)</span>
                      </SectionTitle>
                      <MultiChips options={MEDS.map((m) => m.id)} value={presc} onChange={setPresc} />
                      {interacoes.length > 0 ? (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-red-700">
                            <AlertTriangle className="h-4 w-4" />
                            <span className="text-sm font-medium">Alertas de interação</span>
                          </div>
                          <ul className="text-sm list-disc pl-5">
                            {interacoes.map((a, i) => (
                              <li key={i}>
                                <span className={cn(a.severity === "grave" ? "font-semibold" : "")}>{a.pair}</span> — {a.note}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">Nenhum alerta relevante no momento.</p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </Panel>

          <PanelResizeHandle className="w-2 bg-border hover:bg-primary/20 transition-colors" />

          <Panel defaultSize={34} minSize={30} className="p-2 md:p-4">
            <ScrollArea className="h-full">
              <div className="space-y-6">
                {/* Preview */}
                <Card className="rounded-2xl">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">Preview</CardTitle>
                        <CardDescription>Texto pronto para colar</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch checked={uppercase} onCheckedChange={setUppercase} />
                        <Label className="text-sm">Maiúsculas</Label>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" variant="outline" onClick={() => copySection("HDA")}>HDA</Button>
                      <Button size="sm" variant="outline" onClick={() => copySection("EF")}>EF</Button>
                      <Button size="sm" variant="outline" onClick={() => copySection("HD")}>HD</Button>
                      <Button size="sm" variant="outline" onClick={() => copySection("CONDUTA")}>Conduta</Button>
                      <Button size="sm" variant="outline" onClick={() => copySection("ORIENT")}>Orientações</Button>
                      <Button size="sm" variant="outline" onClick={() => copySection("DETALHE")}>Detalhamento</Button>
                      <Button size="sm" variant="default" onClick={() => copySection("TUDO")}>Tudo</Button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Switch checked={editPreview} onCheckedChange={setEditPreview} />
                        <Label className="text-sm">Editar preview</Label>
                      </div>
                      {editPreview && (
                        <Textarea
                          value={previewOverride}
                          onChange={(e) => setPreviewOverride(e.target.value)}
                          placeholder="Edite o preview aqui..."
                          className="min-h-32"
                        />
                      )}
                    </div>
                    <ScrollArea className="h-64 border rounded-lg p-3">
                      <pre className="whitespace-pre-wrap text-sm font-mono leading-relaxed">
                        {effectivePreview || "Preencha os campos para ver o preview..."}
                      </pre>
                    </ScrollArea>
                    {diverge && (
                      <div className="flex items-center gap-2 text-amber-600 text-sm">
                        <AlertTriangle className="h-4 w-4" />
                        Preview editado manualmente
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          </Panel>
        </PanelGroup>
      </div>
    </main>
  );
}
