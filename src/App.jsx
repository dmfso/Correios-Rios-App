import { useState } from "react";
import {
  Ship,
  MapPin,
  Package,
  ArrowLeft,
  CheckCircle2,
  Wifi,
  Clock,
  Sparkles,
  ChevronRight,
  FileText,
  Box,
  Container,
  Copy,
  Home,
} from "lucide-react";

const PORTOS = ["Tefé", "Coari", "Parintins", "Manaus", "Barcelos", "Santa Isabel", "São Gabriel da Cachoeira"];

const TIPOS = [
  { id: "doc", label: "Documentos", icon: FileText },
  { id: "pequeno", label: "Pacote pequeno", icon: Package },
  { id: "grande", label: "Pacote grande", icon: Box },
  { id: "carga", label: "Carga", icon: Container },
];

const ROTAS = [
  {
    id: "prioritaria",
    nome: "Rota Prioritária",
    cor: "var(--teal)",
    trajeto: "Tefé → Coari → Parintins",
    tempo: "11h 30min",
    preco: "R$ 68,90",
    confianca: 92,
    tag: "Sugerida pela IA",
  },
  {
    id: "secundaria",
    nome: "Rota Secundária",
    cor: "var(--blue)",
    trajeto: "Tefé → Santa Isabel → Barcelos",
    tempo: "9h 15min",
    preco: "R$ 49,90",
    confianca: 81,
    tag: "Mais econômica",
  },
  {
    id: "alternativa",
    nome: "Rota Alternativa",
    cor: "var(--gold)",
    trajeto: "Tefé → São Gabriel da Cachoeira",
    tempo: "7h 40min",
    preco: "R$ 39,90",
    confianca: 68,
    tag: "Mais rápida",
  },
];

const ETAPAS = ["Abrir", "Pedir", "Opções", "Feito"];

function RioProgresso({ etapa }) {
  const nodeX = [8, 37, 66, 92];
  const nodeY = [22, 8, 26, 12];
  const boatX = nodeX[etapa - 1];
  const boatY = nodeY[etapa - 1];

  const path = `M ${nodeX[0]} ${nodeY[0]} Q ${(nodeX[0] + nodeX[1]) / 2} 2, ${nodeX[1]} ${nodeY[1]} T ${nodeX[2]} ${nodeY[2]} T ${nodeX[3]} ${nodeY[3]}`;

  return (
    <div className="rio-progresso">
      <svg viewBox="0 0 100 34" preserveAspectRatio="none" className="rio-svg">
        <path d={path} className="rio-linha-base" />
        <path
          d={path}
          className="rio-linha-ativa"
          style={{
            strokeDasharray: 300,
            strokeDashoffset: 300 - (300 * (etapa - 1)) / 3,
          }}
        />
        {nodeX.map((x, i) => (
          <circle
            key={i}
            cx={x}
            cy={nodeY[i]}
            r={i + 1 <= etapa ? 2.4 : 1.6}
            className={i + 1 <= etapa ? "rio-no-ativo" : "rio-no"}
          />
        ))}
      </svg>
      <div
        className="rio-barco"
        style={{ left: `${boatX}%`, top: `${boatY}%` }}
      >
        <Ship size={14} strokeWidth={2.4} />
      </div>
      <div className="rio-labels">
        {ETAPAS.map((e, i) => (
          <span key={e} className={i + 1 === etapa ? "ativo" : i + 1 < etapa ? "feito" : ""}>
            {e}
          </span>
        ))}
      </div>
    </div>
  );
}

function TopoTela({ titulo, onVoltar }) {
  return (
    <div className="topo-tela">
      {onVoltar ? (
        <button className="btn-icone" onClick={onVoltar} aria-label="Voltar">
          <ArrowLeft size={18} />
        </button>
      ) : (
        <div className="marca">
          <Ship size={16} strokeWidth={2.5} />
          <span>CORREIOS RIOS</span>
        </div>
      )}
      {titulo && <h1>{titulo}</h1>}
      <div className="conexao">
        <Wifi size={13} />
      </div>
    </div>
  );
}

export default function App() {
  const [etapa, setEtapa] = useState(1);
  const [origem, setOrigem] = useState("Tefé");
  const [destino, setDestino] = useState("Parintins");
  const [tipo, setTipo] = useState("pequeno");
  const [peso, setPeso] = useState(3);
  const [rotaEscolhida, setRotaEscolhida] = useState("prioritaria");
  const [codigo] = useState(
    "BR-RIO-" + Math.random().toString(36).slice(2, 7).toUpperCase()
  );
  const [copiado, setCopiado] = useState(false);

  const rota = ROTAS.find((r) => r.id === rotaEscolhida);

  const copiarCodigo = async () => {
    try {
      await navigator.clipboard.writeText(codigo);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 1600);
    } catch (e) {
      /* clipboard indisponível — ignora silenciosamente */
    }
  };

  return (
    <div className="wrap">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500;600&display=swap');

        :root{
          --bg:#060b14;
          --surface:#0f1b2e;
          --surface-2:#16233a;
          --border:#1f3350;
          --text:#eaf1fa;
          --text-dim:#8ca0be;
          --teal:#00e5b0;
          --blue:#4e9eff;
          --gold:#ffc94d;
        }
        *{box-sizing:border-box;}
        .wrap{
          display:flex; justify-content:center; align-items:flex-start;
          background:radial-gradient(circle at 50% -10%, #0c1626 0%, #030509 70%);
          padding:28px 12px; min-height:100%;
          font-family:'Inter',sans-serif;
        }
        .telefone{
          width:380px; min-height:760px;
          background:var(--bg);
          border:1px solid #14203a;
          border-radius:34px;
          padding:14px 14px 20px;
          position:relative;
          box-shadow:0 30px 80px -20px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(255,255,255,0.02);
          overflow:hidden;
        }
        .telefone::before{
          content:"";
          position:absolute; top:14px; left:50%; transform:translateX(-50%);
          width:90px; height:18px; background:#000; border-radius:12px; z-index:5;
        }
        .status-fake{
          display:flex; justify-content:space-between; font-size:11px; color:var(--text-dim);
          padding:2px 10px 10px; font-family:'JetBrains Mono',monospace;
        }
        .tela{ padding:0 4px 4px; }

        .rio-progresso{ position:relative; height:60px; margin:6px 0 14px; }
        .rio-svg{ width:100%; height:34px; overflow:visible; }
        .rio-linha-base{ fill:none; stroke:#1c2c46; stroke-width:1.4; }
        .rio-linha-ativa{ fill:none; stroke:var(--teal); stroke-width:1.4; filter:drop-shadow(0 0 3px rgba(0,229,176,0.6)); transition:stroke-dashoffset .5s ease; }
        .rio-no{ fill:#1c2c46; }
        .rio-no-ativo{ fill:var(--teal); filter:drop-shadow(0 0 4px rgba(0,229,176,0.8)); }
        .rio-barco{
          position:absolute; transform:translate(-50%,-120%);
          width:24px; height:24px; border-radius:50%;
          background:var(--teal); color:#04140f;
          display:flex; align-items:center; justify-content:center;
          transition:left .5s ease, top .5s ease;
          box-shadow:0 0 12px rgba(0,229,176,0.7);
        }
        .rio-labels{ display:flex; justify-content:space-between; font-size:10px; color:var(--text-dim); padding:0 2px; font-family:'Space Grotesk',sans-serif; letter-spacing:.02em;}
        .rio-labels .ativo{ color:var(--teal); font-weight:600; }
        .rio-labels .feito{ color:var(--text); }

        .topo-tela{ display:flex; align-items:center; gap:10px; padding:4px 2px 14px; }
        .topo-tela h1{ font-family:'Space Grotesk',sans-serif; font-size:17px; margin:0; flex:1; color:var(--text); }
        .marca{ display:flex; align-items:center; gap:7px; flex:1; color:var(--text); font-family:'Space Grotesk',sans-serif; font-weight:600; letter-spacing:.06em; font-size:13px; }
        .marca svg{ color:var(--teal); }
        .conexao{ width:26px; height:26px; border-radius:50%; background:rgba(0,229,176,0.1); color:var(--teal); display:flex; align-items:center; justify-content:center; }
        .btn-icone{ width:32px; height:32px; border-radius:10px; border:1px solid var(--border); background:var(--surface-2); color:var(--text); display:flex; align-items:center; justify-content:center; cursor:pointer; }
        .btn-icone:hover{ border-color:var(--teal); }

        /* --- tela 1: home --- */
        .hero{
          background:linear-gradient(160deg, #0d2436 0%, #0a1a2c 55%, #0f1b2e 100%);
          border:1px solid var(--border); border-radius:20px; padding:22px 18px;
          position:relative; overflow:hidden; margin-bottom:16px;
        }
        .hero-linhas{ position:absolute; inset:0; opacity:.35; background:
          repeating-linear-gradient(100deg, transparent 0 18px, rgba(0,229,176,0.06) 18px 19px);
        }
        .hero-conteudo{ position:relative; }
        .saudacao{ color:var(--text-dim); font-size:12.5px; margin:0 0 4px; }
        .hero h2{ font-family:'Space Grotesk',sans-serif; font-size:20px; margin:0 0 14px; color:var(--text); line-height:1.25; max-width:230px; }
        .cta-principal{
          display:flex; align-items:center; justify-content:center; gap:8px;
          background:var(--teal); color:#04140f; border:none; border-radius:13px;
          padding:13px 16px; font-weight:600; font-size:14.5px; width:100%;
          cursor:pointer; font-family:'Inter',sans-serif;
          box-shadow:0 8px 20px -6px rgba(0,229,176,0.5);
        }
        .cta-principal:hover{ filter:brightness(1.06); }
        .mini-stats{ display:flex; gap:10px; margin-top:16px; }
        .mini-stat{ flex:1; background:var(--surface); border:1px solid var(--border); border-radius:14px; padding:12px; }
        .mini-stat span.num{ display:block; font-family:'Space Grotesk',sans-serif; font-size:19px; color:var(--text); }
        .mini-stat span.lbl{ font-size:10.5px; color:var(--text-dim); }
        .lista-recente{ display:flex; flex-direction:column; gap:8px; }
        .item-recente{ display:flex; align-items:center; gap:10px; background:var(--surface); border:1px solid var(--border); border-radius:13px; padding:10px 12px; }
        .item-recente .ic{ width:30px; height:30px; border-radius:9px; background:rgba(78,158,255,0.12); color:var(--blue); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .item-recente .info b{ display:block; font-size:12.5px; color:var(--text); }
        .item-recente .info span{ font-size:10.5px; color:var(--text-dim); }
        .secao-titulo{ font-family:'Space Grotesk',sans-serif; font-size:12.5px; color:var(--text-dim); letter-spacing:.04em; text-transform:uppercase; margin:18px 0 8px 2px; }

        /* --- tela 2: formulário --- */
        .campo{ margin-bottom:16px; }
        .campo label{ display:block; font-size:11.5px; color:var(--text-dim); margin-bottom:7px; font-family:'Space Grotesk',sans-serif; letter-spacing:.02em; }
        .select-porto{ position:relative; }
        .select-porto svg.pin{ position:absolute; left:13px; top:50%; transform:translateY(-50%); color:var(--teal); }
        select{
          width:100%; appearance:none; background:var(--surface); border:1px solid var(--border);
          border-radius:12px; padding:12px 14px 12px 38px; color:var(--text); font-size:13.5px;
          font-family:'Inter',sans-serif; cursor:pointer;
        }
        select:focus{ outline:2px solid var(--teal); outline-offset:1px; }
        .grid-tipos{ display:grid; grid-template-columns:1fr 1fr; gap:9px; }
        .chip-tipo{
          display:flex; flex-direction:column; align-items:center; gap:6px;
          background:var(--surface); border:1px solid var(--border); border-radius:13px;
          padding:14px 8px; cursor:pointer; color:var(--text-dim); font-size:11.5px;
        }
        .chip-tipo.on{ border-color:var(--teal); color:var(--text); background:rgba(0,229,176,0.07); }
        .chip-tipo.on svg{ color:var(--teal); }
        .peso-row{ display:flex; align-items:center; gap:12px; background:var(--surface); border:1px solid var(--border); border-radius:13px; padding:12px 14px; }
        .peso-row input[type=range]{ flex:1; accent-color:var(--teal); }
        .peso-valor{ font-family:'JetBrains Mono',monospace; color:var(--teal); font-size:13px; min-width:44px; text-align:right; }
        .btn-primario{
          width:100%; background:var(--teal); color:#04140f; border:none; border-radius:13px;
          padding:14px; font-weight:600; font-size:14.5px; cursor:pointer;
          display:flex; align-items:center; justify-content:center; gap:6px;
          font-family:'Inter',sans-serif; margin-top:6px;
          box-shadow:0 8px 20px -6px rgba(0,229,176,0.45);
        }
        .btn-secundario{
          width:100%; background:transparent; color:var(--text-dim); border:1px solid var(--border);
          border-radius:13px; padding:13px; font-weight:500; font-size:13.5px; cursor:pointer;
          font-family:'Inter',sans-serif; margin-top:10px;
        }
        .btn-secundario:hover{ color:var(--text); border-color:var(--text-dim); }

        /* --- tela 3: opções de entrega --- */
        .aviso-ia{ display:flex; gap:9px; align-items:flex-start; background:rgba(0,229,176,0.06); border:1px solid rgba(0,229,176,0.25); border-radius:13px; padding:11px 13px; margin-bottom:16px; }
        .aviso-ia svg{ color:var(--teal); flex-shrink:0; margin-top:1px; }
        .aviso-ia p{ margin:0; font-size:12px; color:var(--text-dim); line-height:1.45; }
        .cartao-rota{
          border:1px solid var(--border); background:var(--surface); border-radius:16px;
          padding:14px; margin-bottom:11px; cursor:pointer; position:relative;
        }
        .cartao-rota.on{ border-color:var(--rota-cor); background:linear-gradient(160deg, rgba(255,255,255,0.03), var(--surface)); box-shadow:0 0 0 1px var(--rota-cor), 0 10px 24px -12px var(--rota-cor); }
        .cartao-topo{ display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; }
        .cartao-nome{ display:flex; align-items:center; gap:8px; font-family:'Space Grotesk',sans-serif; font-size:14px; color:var(--text); }
        .bolinha{ width:9px; height:9px; border-radius:50%; background:var(--rota-cor); box-shadow:0 0 6px var(--rota-cor); }
        .tag-rota{ font-size:9.5px; padding:3px 8px; border-radius:20px; background:rgba(255,255,255,0.06); color:var(--text-dim); }
        .cartao-trajeto{ font-size:11.5px; color:var(--text-dim); margin-bottom:10px; }
        .cartao-meta{ display:flex; justify-content:space-between; align-items:flex-end; }
        .cartao-meta .esq{ display:flex; gap:14px; }
        .meta-item{ display:flex; flex-direction:column; }
        .meta-item span.v{ font-family:'JetBrains Mono',monospace; font-size:13px; color:var(--text); }
        .meta-item span.l{ font-size:9.5px; color:var(--text-dim); }
        .preco{ font-family:'Space Grotesk',sans-serif; font-size:16px; color:var(--rota-cor); font-weight:600; }

        /* --- tela 4: confirmação --- */
        .confirma-wrap{ display:flex; flex-direction:column; align-items:center; text-align:center; padding:18px 4px 0; }
        .check-anel{ width:74px; height:74px; border-radius:50%; background:rgba(0,229,176,0.1); display:flex; align-items:center; justify-content:center; margin-bottom:16px; border:1px solid rgba(0,229,176,0.3); }
        .confirma-wrap h2{ font-family:'Space Grotesk',sans-serif; font-size:19px; color:var(--text); margin:0 0 6px; }
        .confirma-wrap p.sub{ font-size:12.5px; color:var(--text-dim); margin:0 0 20px; max-width:260px; }
        .codigo-box{ width:100%; display:flex; align-items:center; justify-content:space-between; background:var(--surface); border:1px dashed var(--border); border-radius:13px; padding:12px 14px; margin-bottom:18px; }
        .codigo-box span.c{ font-family:'JetBrains Mono',monospace; font-size:14.5px; letter-spacing:.03em; color:var(--teal); }
        .codigo-box button{ background:none; border:none; color:var(--text-dim); cursor:pointer; display:flex; align-items:center; gap:5px; font-size:10.5px; }
        .codigo-box button:hover{ color:var(--teal); }
        .resumo-card{ width:100%; background:var(--surface); border:1px solid var(--border); border-radius:16px; padding:16px; text-align:left; margin-bottom:20px; }
        .resumo-linha{ display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--border); font-size:12.5px; }
        .resumo-linha:last-child{ border-bottom:none; }
        .resumo-linha span:first-child{ color:var(--text-dim); }
        .resumo-linha span:last-child{ color:var(--text); font-weight:500; text-align:right; }
      `}</style>

      <div className="telefone">
        <div className="status-fake">
          <span>10:24</span>
          <span>●●● satélite</span>
        </div>

        <div className="tela">
          <RioProgresso etapa={etapa} />

          {/* ETAPA 1 — ABRIR APP */}
          {etapa === 1 && (
            <>
              <TopoTela />
              <div className="hero">
                <div className="hero-linhas" />
                <div className="hero-conteudo">
                  <p className="saudacao">Boa tarde, operador ⚓</p>
                  <h2>Para onde vamos enviar sua encomenda hoje?</h2>
                  <button className="cta-principal" onClick={() => setEtapa(2)}>
                    <Ship size={17} /> Enviar encomenda via barco
                  </button>
                </div>
              </div>

              <div className="mini-stats">
                <div className="mini-stat">
                  <span className="num">356</span>
                  <span className="lbl">Entregas hoje</span>
                </div>
                <div className="mini-stat">
                  <span className="num">79%</span>
                  <span className="lbl">Concluído</span>
                </div>
                <div className="mini-stat">
                  <span className="num">12</span>
                  <span className="lbl">Rotas ativas</span>
                </div>
              </div>

              <div className="secao-titulo">Envios recentes</div>
              <div className="lista-recente">
                <div className="item-recente">
                  <div className="ic"><Package size={15} /></div>
                  <div className="info">
                    <b>Tefé → Coari</b>
                    <span>Entregue às 09:40</span>
                  </div>
                </div>
                <div className="item-recente">
                  <div className="ic"><Package size={15} /></div>
                  <div className="info">
                    <b>Manaus → Barcelos</b>
                    <span>Em trânsito</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ETAPA 2 — PEDIR ENVIO */}
          {etapa === 2 && (
            <>
              <TopoTela titulo="Nova encomenda" onVoltar={() => setEtapa(1)} />

              <div className="campo">
                <label>Porto de origem</label>
                <div className="select-porto">
                  <MapPin size={15} className="pin" />
                  <select value={origem} onChange={(e) => setOrigem(e.target.value)}>
                    {PORTOS.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="campo">
                <label>Porto de destino</label>
                <div className="select-porto">
                  <MapPin size={15} className="pin" />
                  <select value={destino} onChange={(e) => setDestino(e.target.value)}>
                    {PORTOS.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="campo">
                <label>Tipo de encomenda</label>
                <div className="grid-tipos">
                  {TIPOS.map((t) => {
                    const Ic = t.icon;
                    return (
                      <div
                        key={t.id}
                        className={`chip-tipo ${tipo === t.id ? "on" : ""}`}
                        onClick={() => setTipo(t.id)}
                      >
                        <Ic size={18} />
                        {t.label}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="campo">
                <label>Peso aproximado</label>
                <div className="peso-row">
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={peso}
                    onChange={(e) => setPeso(Number(e.target.value))}
                  />
                  <span className="peso-valor">{peso} kg</span>
                </div>
              </div>

              <button
                className="btn-primario"
                onClick={() => setEtapa(3)}
                disabled={origem === destino}
                style={origem === destino ? { opacity: 0.5, cursor: "not-allowed" } : {}}
              >
                Ver opções de entrega <ChevronRight size={16} />
              </button>
              {origem === destino && (
                <p style={{ color: "var(--gold)", fontSize: 11, marginTop: 8, textAlign: "center" }}>
                  Escolha portos de origem e destino diferentes.
                </p>
              )}
            </>
          )}

          {/* ETAPA 3 — OPÇÕES DE ENTREGA */}
          {etapa === 3 && (
            <>
              <TopoTela titulo="Escolha a rota" onVoltar={() => setEtapa(2)} />

              <div className="aviso-ia">
                <Sparkles size={15} />
                <p>
                  A IA analisou nível dos rios, clima e tráfego fluvial para {origem} → {destino}
                  e sugeriu as rotas abaixo.
                </p>
              </div>

              {ROTAS.map((r) => (
                <div
                  key={r.id}
                  className={`cartao-rota ${rotaEscolhida === r.id ? "on" : ""}`}
                  style={{ "--rota-cor": r.cor }}
                  onClick={() => setRotaEscolhida(r.id)}
                >
                  <div className="cartao-topo">
                    <div className="cartao-nome">
                      <span className="bolinha" />
                      {r.nome}
                    </div>
                    <span className="tag-rota">{r.tag}</span>
                  </div>
                  <div className="cartao-trajeto">{r.trajeto}</div>
                  <div className="cartao-meta">
                    <div className="esq">
                      <div className="meta-item">
                        <span className="v">{r.tempo}</span>
                        <span className="l">tempo estimado</span>
                      </div>
                      <div className="meta-item">
                        <span className="v">{r.confianca}%</span>
                        <span className="l">confiança IA</span>
                      </div>
                    </div>
                    <span className="preco">{r.preco}</span>
                  </div>
                </div>
              ))}

              <button className="btn-primario" onClick={() => setEtapa(4)}>
                Confirmar pedido <CheckCircle2 size={16} />
              </button>
            </>
          )}

          {/* ETAPA 4 — PEDIDO FEITO */}
          {etapa === 4 && (
            <>
              <TopoTela titulo="Pedido confirmado" />
              <div className="confirma-wrap">
                <div className="check-anel">
                  <CheckCircle2 size={34} color="var(--teal)" strokeWidth={2} />
                </div>
                <h2>Sua encomenda está a caminho!</h2>
                <p className="sub">
                  Enviamos os detalhes por notificação. Acompanhe o trajeto pelo rio em tempo real.
                </p>

                <div className="codigo-box">
                  <span className="c">{codigo}</span>
                  <button onClick={copiarCodigo}>
                    <Copy size={13} /> {copiado ? "Copiado!" : "Copiar"}
                  </button>
                </div>

                <div className="resumo-card">
                  <div className="resumo-linha">
                    <span>Rota</span>
                    <span>{rota.nome}</span>
                  </div>
                  <div className="resumo-linha">
                    <span>Trajeto</span>
                    <span>{origem} → {destino}</span>
                  </div>
                  <div className="resumo-linha">
                    <span>Tipo</span>
                    <span>{TIPOS.find((t) => t.id === tipo)?.label}</span>
                  </div>
                  <div className="resumo-linha">
                    <span>Peso</span>
                    <span>{peso} kg</span>
                  </div>
                  <div className="resumo-linha">
                    <span>Previsão de chegada</span>
                    <span>{rota.tempo}</span>
                  </div>
                  <div className="resumo-linha">
                    <span>Valor</span>
                    <span>{rota.preco}</span>
                  </div>
                </div>

                <button className="btn-primario">
                  <Clock size={16} /> Acompanhar entrega
                </button>
                <button className="btn-secundario" onClick={() => setEtapa(1)}>
                  <Home size={14} style={{ marginRight: 6, verticalAlign: -2 }} />
                  Voltar ao início
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
