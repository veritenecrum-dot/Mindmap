import * as d3 from 'd3';

// --- DATA (Bundled directly to avoid local file import issues) ---
const mindMapData = {
  id: 'root',
  title: 'Regulamento PM RCC',
  content: 'Guia de consulta rápida e completa do Regulamento da Polícia Militar Revolução Contra o Crime (RCC). Navegue pelos nós para explorar normas, prazos e punições.',
  children: [
    {
      id: 'cap3',
      title: 'Cap. III: Ofícios',
      children: [
        { id: 'cap3-art1', title: 'Art. 1º', content: '🚫 **Proibição:** Flood ou spam no Habbo Hotel.' },
        { id: 'cap3-art2', title: 'Art. 2º', content: '💼 **Norma:** Dedicação exclusiva à PM RCC. Proibido outro emprego militar.' },
        { 
          id: 'cap3-art3', 
          title: 'Art. 3º - Visibilidade e Punições',
          content: '**Norma:** Policiais (Cabo/Assessor+ com CFC1/API) devem estar **sempre online e com perfil visível**.',
          children: [
            {
              id: 'cap3-art3-p1',
              title: '§ 1º - Punições por Abandono/Negligência',
              children: [
                { id: 'cap3-p1-i', title: 'I - Praças (sem cia/subcia)', content: '**Punição:**\n- Orientação inicial.\n- Persistência > 24h: Rebaixamento a cada 24h.\n- Contato impossível: Rebaixamento imediato.' },
                { id: 'cap3-p1-ii', title: 'II - Praças (com cia/subcia)', content: '**Punição:**\n- **-50 medalhas**.\n- Persistência > 24h: Rebaixamento a cada 24h.' },
                { id: 'cap3-p1-iii', title: 'III - Oficiais e Portadores de Direitos', content: '**Punição:**\n- Rebaixamento imediato.\n- Persistência: Rebaixamento a cada 24h + Perda de direitos.' },
              ]
            },
            { id: 'cap3-art3-p2', title: '§ 2º - Comprovação', content: '**Norma:** Justificativa para perfil offline/invisível exige **printscreen** ou, alternativamente, **depoimentos** de testemunhas.' },
            { id: 'cap3-art3-p3', title: '§ 3º - Verificação Obrigatória', content: '**Proibição:** Alistar, vender cargos ou contratar civis sem perfil visível/online.\n**Responsáveis:** Operadores 4, 2 e 1.' },
            { id: 'cap3-art3-p4', title: '§ 4º - Isenção', content: '**Isenção:** Punição não se aplica a autorizados pelo **Alto Comando Supremo** ou **Setor de Inteligência**.'},
            { id: 'cap3-art3-p5', title: '§ 5º - Punição por Venda Irregular', content: '**Crime:** Venda/contratação de civis sem perfil visível/online.\n**Punição:** **-50 medalhas** (Abandono de Dever/Negligência).' },
          ]
        },
        { 
          id: 'cap3-art4',
          title: 'Art. 4º - Status de Serviço',
          content: '**Status "Em serviço":** Uniforme + Missão/Grupo RCC.\n**Aviso:** Status "Fora de serviço" não isenta de punição por atos ilícitos em nome da instituição.'
        },
      ]
    },
    {
      id: 'cap4',
      title: 'Cap. IV: Perímetro',
      children: [
        { id: 'cap4-art1', title: 'Art. 1º - Uso Obrigatório de Equipamentos', content: '**Norma:** Uso obrigatório de missão, farda e grupo da patente.\n**Exceções:** Supervisão, aula de praças, pós-avaliação do Corpo Executivo (CE) (para criação de conta RCCS).' },
        { 
          id: 'cap4-art2',
          title: 'Art. 2º - Punição por Entrada Irregular',
          content: '**Infração:** Entrar sem requisitos, com visual/efeito não permitido.',
          children: [
            { id: 'cap4-art2-i', title: 'I - Policial sem CFC1/API', content: '**Punição:** Advertência verbal.' },
            { id: 'cap4-art2-ii', title: 'II - Policial com CFC1/API', content: '**Punição:** Apresentar-armas por **15 minutos**.' }
          ]
        },
        { 
          id: 'cap4-art3',
          title: 'Art. 3º - Proibição de Inatividade (Zzz)',
          content: '**Norma:** Proibido estado inativo ("Zzz") em batalhões e Corredor Principal.',
           children: [
            { id: 'cap4-art3-p1', title: '§ 1º - Policial sem CFC1/API', content: '**Punição:** Advertência verbal por inatividade.' },
            { id: 'cap4-art3-p2', title: '§ 2º - Policial com CFC1/API', 
              children: [
                  { id: 'cap4-art3-p2-i', title: 'I - Fora de Atividade', content: '**Punição:** Apresentar-armas por **10 minutos**.' },
                  { id: 'cap4-art3-p2-ii', title: 'II - Em Atividade', content: '**Punição:** Apresentar-armas por **15 minutos**.' }
              ]
            }
          ]
        },
        { id: 'cap4-art4', title: 'Art. 4º - Aguardo da Escola de Formação', content: '**Norma:** Executivos que ainda não possuem o curso da **Escola de Formação de Executivos (EFE)** devem aguardar os instrutores na sala de ausência/ala imperial.\n**Infração:** Recusa de curso (APB/Av-CE) -> Intimação para esses locais.'},
        { 
            id: 'cap4-art5', 
            title: 'Art. 5º - Aliados e Convidados',
            children: [
                { id: 'cap4-art5-aliados', title: 'Organizações Aliadas', content: '**Permitidos:** APENAS **ARTM** e **GOPH**. Exonerados no RCCS devem ser intimados a sair; permanência resulta em expulsão.' },
                { id: 'cap4-art5-p1', title: '§ 1º - Local de Permanência', content: '**Local:** Ala Imperial ou Sala de Estado (conforme lotação). Oficial da Guarda pode solicitar alternância.' },
                { id: 'cap4-art5-p2', title: '§ 2º - Outros Convidados', content: '**Convidados:** Outras polícias/jornais SÓ com permissão do **Alto Comando Supremo**.' },
                { id: 'cap4-art5-p3', title: '§ 3º - Regra de Uniforme', content: '**Obrigação:** Aliados e convidados devem estar **uniformizados** e com **missão/emblema**.' }
            ]
        }
      ]
    },
    {
      id: 'cap6',
      title: 'Cap. VI: Hierarquia',
      children: [
        { id: 'cap6-art1', title: 'Art. 1º - Divisões', content: '**Estrutura:** Corpo Militar (12 patentes) e Corpo Executivo (21 cargos).'},
        { 
          id: 'cap6-art4', 
          title: 'Art. 4º - Venda e Contrato de Cargos',
          children: [
            { id: 'cap6-art4-i', title: 'I - Contratação de Trainee', content: '**Execução:** Esquadrão do Corpo Executivo (CE) ou, na ausência, Diretoria do Corpo Executivo (CE).' },
            { id: 'cap6-art4-ii', title: 'II - Venda de Cargos', content: '**Execução:** Comandantes Supremos ou autorizados com grupo "[RCC] Vendedor de cargo".' },
            { id: 'cap6-art4-iii', title: 'III - Descontos', content: '**Regra:** Apenas com permissão dos **Comandantes Supremos**.' },
            { id: 'cap6-art4-iv', title: 'IV - Upgrade de Cargo', content: '**Regra:** Paga-se apenas a diferença de valor.' }
          ]
        },
        { 
          id: 'cap6-art5',
          title: 'Art. 5º - Limite de Vagas por Patente',
          children: [
            { id: 'vagas-ten', title: 'Tenente', content: '20 vagas' },
            { id: 'vagas-cap', title: 'Capitão', content: '16 vagas' },
            { id: 'vagas-cor', title: 'Coronel', content: '14 vagas' },
            { id: 'vagas-gen', title: 'General', content: '10 vagas' },
            { id: 'vagas-mar', title: 'Marechal', content: '10 vagas' },
            { id: 'vagas-com', title: 'Comandante', content: '5 vagas' },
            { id: 'vagas-comg', title: 'Comandante-Geral / Chanceler', content: '4 vagas' }
          ]
        },
        { 
          id: 'cap6-art6',
          title: 'Art. 6º - Vaga Extraordinária',
          content: '**Condição:** **1 vaga extra** liberada se **5 oficiais** da mesma patente estiverem em licença e todas as vagas estiverem lotadas.',
          children: [
            { id: 'cap6-art6-p1', title: '§ 1º - Renovação', content: '**Regra:** A vaga é **renovável** sempre que a condição for atendida.' },
            { id: 'cap6-art6-p2', title: '§ 2º - Requerimento', content: '**Obrigação:** Promotor deve especificar a normativa da exceção no requerimento.' },
            { id: 'cap6-art6-p3', title: '§ 3º - Punição', content: '**Punição (Descumprimento):** Cancelamento do requerimento + **-50 medalhas**.' },
            { id: 'cap6-art6-p4', title: '§ 4º - Exceções da Regra', content: '**Exceção:** Não se aplica a **Comandante**, **Comandante-Geral** e **Chanceler por mérito**.' }
          ]
        },
      ]
    },
    {
      id: 'cap7',
      title: 'Cap. VII: Normativas Hierárquicas',
      children: [
        { 
          id: 'cap7-art1', 
          title: 'Art. 1º - Legalidade e Recurso', 
          children: [
            { id: 'c7a1-legal', title: 'Legalidade e Provas', content: '**Princípio:** Ações devem ser legais, sem privilégios. Punições exigem **provas e motivos**.' },
            { id: 'c7a1-p-unico', title: 'Direito de Recurso', content: '**Direito:** Policial punido pode recorrer a: **Oficial Superior > Corregedoria > Alto Comando Supremo** (nesta ordem).' },
          ]
        },
        { id: 'c7a2', title: 'Art. 2º - Autonomia do Superior', content: '**Autonomia:** Superior pode punir sem autorização.\n**Requisitos:**\n- **Executivo:** Espec. Básica (mínimo).\n- **Militar:** Aula de Promotor (PRO).' },
        { id: 'c7a3', title: 'Art. 3º - Prazo de Instrução', content: '**Prazo:** Promotor tem **24h** para instruir o subalterno sobre a ação (exceto deslig./exon.). Ação deve ocorrer na RCC.'},
        { id: 'c7a4', title: 'Art. 4º - Prazo de Postagem', content: '**Prazo:** Postar requerimento em **até 1h** após divulgação.\n**Exceção:** Advertência verbal.\n**Contingência:** Perda de acesso ao RCCS -> Cancelar verbalmente em até 1h.'},
        { id: 'c7a5', title: 'Art. 5º - Requerimento Negado', content: '**Prazo:** Requerimento negado -> Promotor tem **24h** para corrigir e repostar.\n**Exceção:** Regra inválida se policial já foi promovido ou se o promotor cancelar a ação.'},
        { id: 'c7a6', title: 'Art. 6º - Punição por Descumprimento', content: '**Punição (ao Promotor):** Descumprimento das normas ->\n- **Oficial:** Advertência escrita.\n- **Praça:** **-50 medalhas**.'},
        {
          id: 'cap7-s2',
          title: 'Seção II: Diretrizes do Corpo Executivo',
          children: [
            { 
              id: 'c7s2-art3', 
              title: 'Art. 3º - Níveis de Especialização',
              children: [
                { 
                  id: 'nivel1', 
                  title: 'Nível 1: Básica', 
                  children: [
                    { id: 'n1-reqs', title: 'Requisitos', content: '- Ter concluído a Aula de Formação de Praças (AFP) ou a Avaliação Periódica do Corpo Executivo (Av.CE), a Aula de Segurança (SEG) e o Curso de Aperfeiçoamento da Comunicação (CAC);\n- Mínimo **03 dias** no CE.\n- Cargo ≥ Assistente.\n- TAG ativa no RCCS.'},
                    { id: 'n1-perms', title: 'Promoção (com Permissão)', content: '- Praças: 1 Oficial (CM) ou 1 Oficial (CE Interm.).\n- Oficiais (Ten-Cel): 1 Corregedor.\n- Oficiais (Gen+): 2 Corregedores.\n- Oficiais CE: 1 Diretor.'}
                  ]
                },
                { 
                  id: 'nivel2', 
                  title: 'Nível 2: Intermediária', 
                  children: [
                    { id: 'n2-reqs', title: 'Requisitos', content: '- Todos da Básica.\n- Estar em Cia.\n- Ter o Curso de Formação de Oficiais (CFO) concluído.\n- Ser Oficial do CE.\n- Mínimo **14 dias** no CE.\n- Avaliação da Diretoria.' },
                    { id: 'n2-perms', title: 'Promoção', content: '- Praças e Oficiais (Ten-Cel): **Sem permissão**.\n- Oficiais (Gen+): Permissão de 1 Corregedor.\n- Oficiais CE (Sup+): Permissão de 1 Diretor.'}
                  ]
                },
                { 
                  id: 'nivel3', 
                  title: 'Nível 3: Avançada', 
                  children: [
                    { id: 'n3-reqs', title: 'Requisitos', content: '- Todos da Intermediária.\n- Ter a Aula de Formação de Oficiais (AFO) concluída.\n- Avaliação da Diretoria.\n- Certificado de Qualificação do Oficialato Interm.' },
                    { id: 'n3-perms', title: 'Promoção', content: '**Sem permissão** para promover qualquer Praça/Oficial (CM/CE).' }
                  ]
                }
              ]
            },
             { 
              id: 'c7s2-regras-gerais', 
              title: 'Regras Gerais de Especialização', 
              children: [
                { id: 'rg-e-1', title: '§ 1º - Acumulativas', content: '**Regra:** Especializações são acumulativas.'},
                { id: 'rg-e-4', title: '§ 4º - Prazo para Promovidos', content: '**Prazo:** Promovidos a oficialato têm **7 dias** para solicitar Espec. Intermediária à Diretoria. **Punição:** Perda do direito.'},
                { id: 'rg-e-5', title: '§ 5º - Prazo para Migração', content: '**Prazo:** Oficiais-Generais que migram para o Corpo Executivo (CE) têm **48h** para concluir cursos e solicitar Espec. Intermediária.'},
                { id: 'c7s2-art4', title: 'Art. 4º - Solicitação de Avanço',
                  children: [
                    {id: 'c7a4-p3', title: '§ 3º - Tentativas SAE', content: '**Limite:** **3 tentativas** para a Supervisão de Avanço de Especialização (SAE). Reprovação -> Nova tentativa após **7 dias**.' },
                    {id: 'c7a4-p5', title: '§ 5º - Prazo Pós-Indeferimento', content: '**Prazo:** Solicitação indeferida por portador Avançado -> Nova solicitação após **7 dias**.' }
                  ]
                },
                { id: 'c7s2-art5-p3', title: 'Art. 5º, § 3º - Retorno de Licença', content: '**Obrigação:** Portador Avançado deve repor **mínimo 7 dias** de atividade pós-licença para conceder novamente.'},
                { id: 'c7s2-art6', title: 'Art. 6º - Dever de Informar', content: '**Prazo:** Portador Avançado tem **24h** para informar, de forma fundamentada, o motivo de um indeferimento.'},
                { id: 'c7s2-art7', title: 'Art. 7º - Promoção Pós-Compra', content: '**Regra:** Promoção/rebaixamento por comprador de cargo exige dias mínimos de serviço.\n**Punição:** **-50 medalhas**.'}
              ]
            }
          ]
        },
        {
          id: 'cap7-s3',
          title: 'Seção III – Permissões',
          children: [
            { id: 'c7s3-art1', title: 'Art. 1º - Registro Obrigatório', content: '**Regra:** Registrar permissão no RCCS **ANTES** da postagem.\n**Punições (ao concessor):**\n- **Até 1h depois:** -50 medalhas.\n- **Após 1h / Não postar:** Advertência escrita.' },
            { id: 'c7s3-art2-4', title: 'Art. 2º a 4º - Regras de Uso', content: '**Proibições:**\n- Uso desnecessário de permissões.\n- Postar requerimento sem permissão exigida.\n- Cancelar permissão após aprovação do RH.' }
          ]
        },
        {
          id: 'cap7-s5',
          title: 'Seção V – Dos Cancelamentos',
          children: [
            { 
              id: 'c7s5-art1', 
              title: 'Art. 1º - Prazos para Cancelamento',
              children: [
                { id: 'c7s5-a1-i', title: 'Gratificações/Promoções', content: '**Prazo:** Até **24 horas** após postagem.'},
                { id: 'c7s5-a1-ii', title: 'Punições', content: '**Prazo:** Até **48 horas** após postagem.'},
                { id: 'c7s5-a1-iii', title: 'Desligamento/Reforma', content: '**Requisito:** Apenas com autorização do **ACS**.'}
              ]
            },
            { id: 'c7s5-art3', title: 'Art. 3º - Requisitos para Cancelar', content: '**Requisitos (Cancelador):**\n- Ser Oficial CM/CE com Espec. Intermediária.\n- Ser superior ao promotor do requerimento.'},
            { id: 'c7s5-art5', title: 'Art. 5º - Notificação Obrigatória', content: '**Prazo:** Ao cancelar ação de outrem, notificar o promotor original em **até 24h** com os motivos.'},
          ]
        },
        {
          id: 'cap7-s6',
          title: 'Seção VI – Certificados',
          children: [
            { id: 'c7-s6-cfe', title: 'CFE - Formação de Executivos', content: '**Benefício:** Isenção de aulas do CE e direito à Avaliação Periódica do Corpo Executivo (Av-CE).\n**Retorno (até 6 meses):** Dispensa APB, API, APA, AFP.'},
            { 
              id: 'c7-s6-cfo', 
              title: 'CFO - Certificado de Formação de Oficiais', 
              children: [
                {id: 'cfo-perda1', title: 'Condição de Perda 1', content: '**Motivo:** Ficar **6 meses inativo** no RCCS.'},
                {id: 'cfo-perda2', title: 'Condição de Perda 2', content: '**Motivo:** Não alcançar Aspirante+/Analista+ após **6 meses de serviço ativo**.'}
              ]
            },
            { 
              id: 'c7-s6-cq', 
              title: 'CQ - Qualificação de Oficiais Intermediários',
              children: [
                {id: 'cq-validade', title: 'Validade e Benefício', content: '**Validade:** 1 ano.\n**Benefício:** Permite promoção a General ou avanço para Espec. Avançada.'},
                {id: 'cq-perda', title: 'Condição de Perda', content: '**Motivo:** Não atingir Capitão+/Inspetor+ (Interm.) em **1 ano de serviço ativo**.'}
              ]
            },
            { id: 'c7-s6-pa', title: 'PA - Certificado de Contribuição Jurídica', content: '**Benefício:** Permite promoção a Comandante, adquirido via requisição de Projeto Aprovado.\n**Validade:** Toda a carreira.'}
          ]
        }
      ]
    },
     {
      id: 'cap8',
      title: 'Cap. VIII: Mediação Hierárquica (MH)',
      children: [
        { 
          id: 'cap8-art1-2', 
          title: 'Art. 1º e 2º - Propósito e Elegibilidade',
          children: [
            { id: 'c8-proposito', title: 'Propósito', content: 'Promover Praças (Soldado a Subtenente; Trainee a Analista-Chefe) no prazo médio, via avaliação de conhecimento.'},
            { id: 'c8-elegib', title: 'Elegibilidade', content: '**Requisitos:**\n- **DOBRO** do tempo mínimo para promoção.\n- **TODOS** os cursos obrigatórios concluídos.'}
          ]
        },
        { 
          id: 'cap8-art3-5', 
          title: 'Art. 3º a 5º - Processo e Resultado',
          children: [
            { id: 'c8-processo', title: 'Processo', content: 'Avaliação de conhecimento. Para Analista-Chefe, avaliação é intensificada para ascender a Oficial.'},
            { id: 'c8-resultado', title: 'Resultado', content: 'Aprovação = Promoção imediata via TAG do Centro de Elitização Militar (CEM).'},
            { id: 'c8-limite', title: 'Limite de Tentativas', content: '**Limite:** **UMA ÚNICA TENTATIVA** por patente/cargo. Sem direito a refazer.'}
          ]
        }
      ]
    },
     {
      id: 'cap9',
      title: 'Cap. IX: Companhias e Subcompanhias',
      children: [
        { 
          id: 'cap9-art2-3', 
          title: 'Art. 2º e 3º - Regras de Companhia', 
          children: [
            { id: 'c9a2', title: 'Art. 2º - Obrigação', content: '**Obrigação:** Todo oficial (CM/CE Interm.) deve estar em uma Cia.\n**Punição:** Após **7 dias** sem Cia, será punido.'},
            { id: 'c9a3', title: 'Art. 3º - Liderança', content: '**Requisito:** Apenas oficiais (CM/CE) com Espec. Intermediária.\n**Prazo:** Perda de requisito -> **30 dias** para regularizar.'}
          ]
        },
        { 
          id: 'cap9-art4', 
          title: 'Art. 4º - Limites de Medalhas Temporárias', 
          children: [
            { id: 'c9a4-cias', title: 'Companhias', content: '- Eventos internos: **100/mês**.\n- Ativ. gerais: **60/mês**.\n- Total geral: **120/mês**.' },
            { id: 'c9a4-subcias', title: 'Subcompanhias', content: '- Ativ. gerais: **50/mês**.\n- Total geral: **100/mês**.' },
            { id: 'c9a4-punicao', title: 'Punição por Excesso', content: 'Postar acima do teto sem autorização do ACS -> **-50 medalhas** para o responsável.' }
          ]
        },
        { 
          id: 'cap9-art5-7', 
          title: 'Art. 5º a 7º - Destaques e Prazos',
          children: [
            { id: 'c9a5', title: 'Destaque da Semana', content: '**Prazo:** Postar no Diário Oficial até 2ª feira, **23:59**.\n**Punição:** **-50 medalhas**.' },
            { id: 'c9a7', title: 'Destaque do Mês', content: '**Prazo:** Postar no Diário Oficial até dia **03**, **23:59**.\n**Punição:** **-50 medalhas**.' },
            { id: 'c9-melhor-policial', title: 'Prêmio Destaque do Mês', content: '**Prêmio:** Uso do emblema "[RCC] Melhor Policial" por **30 dias** + medalha no perfil.' }
          ]
        },
        {
          id: 'cap9-s2',
          title: 'Seção II – Diretrizes de Subcompanhias',
          children: [
            { 
              id: 'c9-s2-pulo', 
              title: 'Punição por "Pulo de Conteúdo"', 
              children: [
                {id: 'pulo1', title: 'Até 4 linhas', content: '**Punição:** -50 med.\n**Reincidência:** Rebaix. + expulsão.'},
                {id: 'pulo2', title: '5-6 linhas (Praças)', content: '**Punição:** -50 med.\n**Reincidência:** Rebaix. + expulsão.'},
                {id: 'pulo3', title: '5-6 linhas (Oficiais)', content: '**Punição:** Adv. escrita.\n**Reincidência:** Rebaix. + expulsão.'},
                {id: 'pulo4', title: 'Mais de 6 linhas', content: '**Punição:** Rebaixamento e expulsão.'}
              ]
            },
            { 
              id: 'c9-s2-grat', 
              title: 'Gratificações Temporárias',
              children: [
                { id: 'grat1', title: 'Grupos Internos', content: '**Distribuição:** 20/mês (Cia), 10/mês (Subcia).'},
                { id: 'grat2', title: 'Projetos Aprovados', content: '**Distribuição:** 20/projeto.\n**Prazo:** Postar em até **48h**.\n**Punição:** **-50 medalhas**.'},
                { id: 'grat3', title: 'Limite por Membro', content: '**Limite/Mês:** **30** (em Cia) ou **20** (em Subcia), mesmo em múltiplos grupos.'}
              ]
            },
            { 
              id: 'c9-s2-saida', 
              title: 'Regras para Saída de Grupo de Tarefa',
              children: [
                { id: 'saida1', title: 'Período de Adaptação', content: 'Saída sem punição nos primeiros **14 dias**.' },
                { id: 'saida2', title: 'Saída Padrão', content: 'Após 14 dias, a saída só é efetivada após **30 dias**.' },
                { id: 'saida3', title: 'Saída Precoce', content: 'Solicitar saída antes do prazo de 30 dias -> **Punição:** **-50 medalhas**.' },
                { id: 'saida4', title: 'Compensação de Licença', content: '**Regra:** Militar em licença deve compensar dias ausentes para isenção da punição.' }
              ]
            },
            { id: 'c9-s2-art12', title: 'Art. 12º - Entrega de Acessos', content: '**Obrigação:** Líder que sai do cargo DEVE entregar todos os acessos.\n**Punição:** Abandono de dever + Exoneração por tempo indeterminado.'}
          ]
        }
      ]
    },
    {
      id: 'cap10',
      title: 'Cap. X: Setor de Relações Públicas (SRP)',
      children: [
          {
              id: 'cap10-s1',
              title: 'Seção I - Missões',
              children: [
                  { id: 'c10s1-art2', title: 'Art. 2º - Promotor da Missão', content: '**Requisitos:**\n- Ser Oficial do CM ou CE.\n- Possuir Espec. Intermediária.'},
                  { 
                    id: 'c10s1-art3', 
                    title: 'Art. 3º - Requisitos do Receptor da Missão',
                    children: [
                      { id: 'c10a3-i', title: 'I - Patente e Tempo', content: '**Requisitos:** Patente ≥ Aspirante+/Analista+ (Espec. Básica) + Mínimo **06 dias** de carreira.'},
                      { id: 'c10a3-ii', title: 'II - Missões Recentes', content: '**Restrição:** Nenhuma missão em andamento/concluída nos últimos **7 dias**.'},
                      { id: 'c10a3-iii', title: 'III - Licença/Reserva', content: '**Restrição:** Não pode estar de licença ou em reserva.'}
                    ]
                  },
                  { 
                    id: 'c10s1-art4', 
                    title: 'Art. 4º - Normas e Prazos da Missão',
                    children: [
                      { id: 'c10a4-p1', title: '§ 1º - Atribuição', content: '**Prazo:** Atribuir (presencial/MP) e postar em "SRP-Missões" em **até 1 hora**.' },
                      { id: 'c10a4-p2', title: '§ 2º - Término', content: '**Prazo:** Finalizar e postar em "SRP-Missões" em **até 48 horas**.' },
                      { id: 'c10a4-p5', title: '§ 5º - Cancelamento por Hierarquia', content: '**Prazo:** Se promotor/receptor se tornam pares, cancelar missão em **até 48 horas**.' }
                    ]
                  },
                  {
                    id: 'c10s1-art5',
                    title: 'Art. 5º - Missões Proibidas',
                    children: [
                        { id: 'c10a5-i', title: 'Redações', content: '**Proibido** (Permitido com consentimento).' },
                        { id: 'c10a5-ii', title: 'Realização de Gratificações', content: '**Proibido**.' },
                        { id: 'c10a5-iii', title: 'Envio de Projetos', content: '**Proibido**.' },
                        { id: 'c10a5-iv', title: 'Auxiliar Subalterno', content: '**Proibido** (Permitido para avaliação de desempenho, com consentimento).' },
                    ]
                  },
                  { id: 'c10s1-art7', title: 'Art. 7º - Punição por Não Cumprimento', content: '**Crime:** Abandono de Dever/Negligência.\n**Punições:**\n- **Oficial:** Advertência escrita.\n- **Praça:** **-50 medalhas**.'}
              ]
          },
          {
              id: 'cap10-s2',
              title: 'Seção II – Diário de Atividades',
              children: [
                { 
                  id: 'c10s2-art3', 
                  title: 'Art. 3º - Limites de Agendamento',
                  children: [
                    { id: 'c10a3-reunioes', title: 'Reuniões Gerais', content: '**Limite:** **2** agendamentos/dia.'},
                    { id: 'c10a3-extras', title: 'Atividades Extras', content: '**Limite:** **2** agendamentos/semana.'}
                  ]
                },
                { 
                  id: 'c10s2-art4-5', 
                  title: 'Art. 4º e 5º - Prazos e Justificativas',
                  children: [
                    { id: 'c10a4-prazo', title: 'Prazo de Agendamento', content: '**Antecedência:** **12 horas**.\n**Reagendamento:** **6 horas**.'},
                    { 'id': 'c10a5-JUSTIF', title: 'Atividade Não Realizada', content: '**Prazo:** Justificar em **até 24h**.\n**Punição:** Adv. escrita (oficial) ou **-50 medalhas** (praça).'}
                  ]
                 }
              ]
          }
      ]
    },
    {
      id: 'cap11',
      title: 'Cap. XI: Gratificações e Histórico',
      children: [
        {
          id: 'cap11-s1',
          title: 'Seção I – Diretrizes de Medalhas',
          children: [
            { id: 'c11s1-art1', title: 'Art. 1º - Tipos de Medalhas', content: '- Temporária\n- Efetiva\n- Honraria Particular\n- Honra Temporária\n- Honra Permanente'},
            { 
              id: 'c11s1-limites', 
              title: 'Art. 3º - Limites de Medalhas Temporárias', 
              children: [
                { id: 'limites-gerais', title: 'Limites Padrão', content: '- **Máximo/Dia:** 20 medalhas.\n- **Máximo/Mês:** 600 medalhas.' },
                { 
                  id: 'limites-excecoes-dia', 
                  title: 'Exceções ao Limite DIÁRIO',
                  children: [
                    { id: 'ex-d-a', title: 'a) Projetos aprovados' },
                    { id: 'ex-d-b', title: 'b) Gratificações de Cias/Subcias' },
                    { id: 'ex-d-c', title: 'c) Missões registradas' },
                    { id: 'ex-d-d', title: 'd) Ranking de RP e Corregedoria' },
                  ]
                },
                { 
                  id: 'limites-excecoes-mes', 
                  title: 'Exceções ao Limite MENSAL',
                  children: [
                    { id: 'ex-m-a', title: 'a) Cerimônias premiativas' },
                    { id: 'ex-m-b', title: 'b) Projetos aprovados pelo ACS' }
                  ]
                }
              ]
            },
            {
              id: 'c11s1-art7-8',
              title: 'Art. 7º e 8º - Medalhas Efetivas',
              children: [
                { id: 'c11a7', title: 'Prazo de Postagem', content: '**Responsável:** Auditoria Fiscal.\n**Prazo:** Postar no RCCS em **até 96h** após prazo da tarefa.'},
                { id: 'c11a8', title: 'Controle e Fiscalização', content: '**Responsável:** Auditoria Fiscal. Realiza descontos por acúmulo de cargos e licenças.'}
              ]
            },
             {
              id: 'c11s1-art10-13',
              title: 'Medalhas de Honra e Honraria',
              children: [
                { id: 'c11-honraria-p', title: 'Honraria Particular', content: '**Direito:** Uso por **48h** para destaques em eventos/rankings.'},
                { id: 'c11-honra-t-p', title: 'Honra Temporária/Permanente', content: '**Autorização:** Apenas pelo **ACS**. Projetos aprovados podem render 20-40 medalhas temp.'}
              ]
            }
          ]
        },
        {
          id: 'cap11-s2-s3',
          title: 'Seção II e III – Salário e Histórico',
          children: [
            { id: 'salario', title: 'Diretrizes de Salário', content: '💰 **Câmbio:** A cada **20 medalhas**, +1 câmbio no salário.\n**Exceção:** Não se aplica a quem inicia carreira no dia do pagamento.'},
            { id: 'historico', title: 'Histórico Militar', content: '📜 **Crime:** Falsificação de informações.\n**Punição:** Remoção imediata do histórico pela Corregedoria + punições do Código Penal Militar.'}
          ]
        }
      ]
    },
    {
      id: 'cap15',
      title: 'Cap. XV: Diretoria do Corpo Executivo',
      children: [
        { 
          id: 'cap15-art1', 
          title: 'Art. 1º - Competências da Diretoria', 
          content: '**Requisito:** Ser portador de Especialização Avançada.',
          children: [
            { id: 'dir-comp-1', title: 'I - Análises de Executivos', content: 'Para avanço/regresso de especialização.'},
            { id: 'dir-comp-2', title: 'II - Avaliações para Promoção', content: 'De executivos com Espec. Intermediária.'},
            { id: 'dir-comp-3', title: 'III - Concessão de Permissões', content: 'Para promoções.'},
            { id: 'dir-comp-4-9', title: 'IV a IX - Gestão e Projetos', content: 'Gestão de emblemas, reuniões, "Melhores Executivos", subfóruns, e avaliação de projetos.'},
          ]
        },
        { 
          id: 'cap15-art2', 
          title: 'Art. 2º - Prazos da Votação "Melhores Executivos"', 
          children: [
            { id: 'votacao-q1', title: '1ª Quinzena', content: '**Início:** Dia 15.\n**Resultado:** Dia 18.' },
            { id: 'votacao-q2', title: '2ª Quinzena', content: '**Início:** Último dia do mês.\n**Resultado:** Dia 03 do mês seguinte.' }
          ]
        },
        {
          id: 'cap15-art3', 
          title: 'Art. 3º - Bloqueio de Promoções', 
          content: '**Regra:** Promoções são bloqueadas durante avaliações (quinzenais/mensais).\n**Punição:** Promoção durante bloqueio -> Advertência escrita + cancelamento.\n**Exceção:** Corregedores podem promover.'
        },
        { 
          id: 'cap15-art4', 
          title: 'Art. 4º - Gratificações Hierárquicas', 
          children: [
            { id: 'dir-grat-membro', title: 'Membro (DIR) / Secretário (S.DIR)', content: '**Bônus:** **20 medalhas** efetivas/quinzena.' },
            { id: 'dir-grat-vp', title: 'Vice-Presidente (VP.DIR)', content: '**Bônus:** **30 medalhas** efetivas/mês.' },
            { id: 'dir-grat-pres', title: 'Presidente (Pres.DIR)', content: '**Bônus:** **30 medalhas** efetivas/mês.' }
          ]
        },
        { 
          id: 'cap15-art5', 
          title: 'Art. 5º - Requisitos para ser Diretor', 
          children: [
            { id: 'dir-req-1', title: 'I - Requisito Principal', content: 'Ser Superintendente+ com Especialização Avançada.'},
            { id: 'dir-req-2-5', title: 'II a V - Perfil', content: 'Ser exemplar, imparcial, participativo e proativo.'},
            { id: 'dir-req-p-unico', title: 'Parágrafo Único', content: '**Regra:** Obter Espec. Avançada torna-se automaticamente membro da Diretoria.'}
          ]
        }
      ]
    }
  ],
};


// --- STATE & CONFIG ---
let selectedNodeId = mindMapData.id;

// --- CONSTANTS ---
const TITLE_NODE_WIDTH = 200;
const TITLE_NODE_HEIGHT = 80;
const CONTENT_NODE_WIDTH = 320;
const CONTENT_NODE_MAX_HEIGHT = 220;
const DURATION = 500;
const EASE = d3.easeCubicOut;

// --- DOM ELEMENTS ---
const container = document.getElementById('mind-map-container');
if (!container) throw new Error('Container element not found');

const svg = d3.create('svg')
    .attr('id', 'mind-map-svg')
    .attr('width', '100%')
    .attr('height', '100%');
const svgNode = svg.node();
if(svgNode) container.append(svgNode);

// Add shadow filter definition
const defs = svg.append('defs');
const filter = defs.append('filter')
    .attr('id', 'shadow')
    .attr('x', '-50%').attr('y', '-50%')
    .attr('width', '200%').attr('height', '200%');
filter.append('feDropShadow')
    .attr('dx', 0).attr('dy', 4)
    .attr('stdDeviation', 5)
    .attr('flood-color', '#000000')
    .attr('flood-opacity', 0.4);

// Add a stronger shadow for hover state
const filterHover = defs.append('filter')
    .attr('id', 'shadow-hover')
    .attr('x', '-50%').attr('y', '-50%')
    .attr('width', '200%').attr('height', '200%');
filterHover.append('feDropShadow')
    .attr('dx', 0).attr('dy', 6)
    .attr('stdDeviation', 8)
    .attr('flood-color', '#000000')
    .attr('flood-opacity', 0.5);

const g = svg.append('g').attr('class', 'main-group');

// --- HIERARCHY & LAYOUT ---
const root = d3.hierarchy(mindMapData);
root.x0 = 0;
root.y0 = 0;

// Collapse all nodes beyond the first level initially
root.descendants().forEach(d => {
    if (d.depth > 0) { // Keep root expanded
       d._children = d.children;
       d.children = null;
    }
});

const treeLayout = d3.tree().nodeSize([CONTENT_NODE_WIDTH + 80, 350]);

// --- HELPER FUNCTIONS ---
function calculateNodeHeight(content) {
    if (!content) return TITLE_NODE_HEIGHT;
    const BASE_PADDING = 80;
    const CHARS_PER_LINE = 45;
    const LINE_HEIGHT = 22.4;
    const lines = content.split('\n').reduce((acc, line) => {
        return acc + Math.max(1, Math.ceil(line.length / CHARS_PER_LINE));
    }, 0);
    const calculatedHeight = BASE_PADDING + (lines * LINE_HEIGHT);
    return Math.max(110, Math.min(calculatedHeight, CONTENT_NODE_MAX_HEIGHT));
}

function parseContentToHTML(text) {
    let html = text.replace(/\*\*(.*?)\*\*/g, `<strong style="font-weight: bold; color: #fef08a;">$1</strong>`);
    html = html.replace(/\n/g, '<br />');
    return html;
}

// --- EVENT HANDLERS ---
function handleNodeSelect(d) {
    selectedNodeId = d.data.id;
    // Just update styles, no need for a full re-render/transition
    g.selectAll('rect.node-rect')
     .transition().duration(DURATION / 2).ease(EASE)
     .attr('stroke', n => n.data.id === selectedNodeId ? '#a5b4fc' : 'rgba(255, 255, 255, 0.2)')
     .attr('stroke-width', n => n.data.id === selectedNodeId ? 3 : 1.5);
}

function handleToggleExpand(d) {
    if (d.children) { // Collapse node
        d._children = d.children;
        d.children = null;
    } else { // Expand node
        d.children = d._children;
        d._children = null;

        // Collapse siblings
        if (d.parent && d.parent.children) {
            d.parent.children.forEach(sibling => {
                if (sibling !== d && sibling.children) {
                    sibling._children = sibling.children;
                    sibling.children = null;
                }
            });
        }
    }
    render(d); // Re-render from the clicked node
}

// --- ZOOM/PAN LOGIC using d3.zoom ---
const zoom = d3.zoom()
    .scaleExtent([0.2, 2.5])
    .on('start', () => svg.style('cursor', 'grabbing'))
    .on('zoom', (event) => {
        g.attr('transform', event.transform);
    })
    .on('end', () => svg.style('cursor', 'grab'));

svg.call(zoom);

// Set initial transform to center the graph
const { width, height } = container.getBoundingClientRect();
const initialTransform = d3.zoomIdentity.translate(width / 2, height / 2).scale(0.8);
svg.call(zoom.transform, initialTransform);


// --- RENDER FUNCTION ---
function render(source) {
    const treeRoot = treeLayout(root);
    const nodes = treeRoot.descendants();
    const links = treeRoot.links();
    
    // Normalize y-coordinates to prevent vertical tree drift during animations
    const yOffset = treeRoot.y;
    nodes.forEach(node => {
        node.y = node.y - yOffset;
    });

    // --- LINKS ---
    const linkGenerator = d3.linkVertical().x(d => d.x).y(d => d.y);
    const link = g.selectAll('path.link').data(links, d => d.target.data.id);
    
    const linkEnter = link.enter().insert('path', 'g')
        .attr('class', 'link')
        .attr('d', () => {
            const o = { x: source.x0, y: source.y0 };
            return linkGenerator({ source: o, target: o });
        });
    
    linkEnter.merge(link).transition().duration(DURATION).ease(EASE).attr('d', linkGenerator);

    link.exit().transition().duration(DURATION).ease(EASE)
        .attr('d', () => {
            const o = { x: source.x, y: source.y };
            return linkGenerator({ source: o, target: o });
        })
        .remove();

    // --- NODES ---
    const node = g.selectAll('g.node-positioner').data(nodes, d => d.data.id);

    const nodeEnter = node.enter().append('g')
        .attr('class', 'node-positioner')
        .attr('transform', `translate(${source.x0}, ${source.y0})`)
        .style('opacity', 0);
    
    const nodeGroup = nodeEnter.append('g')
        .attr('class', 'node-group');

    nodeGroup.each(function(d) {
        const group = d3.select(this);
        const hasContent = !!d.data.content;
        const width = hasContent ? CONTENT_NODE_WIDTH : TITLE_NODE_WIDTH;
        const height = calculateNodeHeight(d.data.content);

        const fill = 'rgba(30, 41, 59, 0.6)'; // slate-800 with opacity
        const textColor = '#e2e8f0'; // slate-200
        
        group.append('rect')
            .attr('class', 'node-rect')
            .attr('x', -width / 2).attr('y', -height / 2)
            .attr('width', width).attr('height', height)
            .attr('rx', 16).attr('fill', fill)
            .attr('stroke', 'rgba(255, 255, 255, 0.2)') // Glass edge
            .attr('stroke-width', 1.5)
            .attr('filter', 'url(#shadow)');

        const titleY = hasContent ? -height / 2 + 15 : -12;
        group.append('foreignObject')
             .attr('x', -width / 2 + 12).attr('y', titleY)
             .attr('width', width - 24).attr('height', 50)
             .append('xhtml:div')
             .style('color', textColor).style('font-size', '15px')
             .style('font-weight', '600').style('text-align', 'center')
             .style('pointer-events', 'none').html(d.data.title);

        if (d.data.content) {
            group.append('foreignObject')
                .attr('x', -width / 2 + 20).attr('y', -height / 2 + 65)
                .attr('width', width - 40).attr('height', height - 80)
                .append('xhtml:div')
                .attr('class', 'node-content-wrapper').style('color', textColor)
                .html(parseContentToHTML(d.data.content, textColor));
        }

        if (d.data.children || d._children) {
            const toggleButton = group.append('g')
                .attr('class', 'toggle-button')
                .attr('transform', `translate(0, ${height / 2})`)
                .on('click', (event, d) => {
                    event.stopPropagation();
                    handleToggleExpand(d);
                });
            toggleButton.append('circle').attr('class', 'toggle-button-circle').attr('r', 15);
            toggleButton.append('text').attr('class', 'toggle-button-text').attr('y', 2);
        }
    });
    
    nodeEnter.on('click', (event, d) => {
        if (event.target.closest('.toggle-button')) return;
        handleNodeSelect(d);
    });

    const nodeUpdate = nodeEnter.merge(node);

    nodeUpdate.transition().duration(DURATION).ease(EASE)
        .attr('transform', d => `translate(${d.x}, ${d.y})`)
        .style('opacity', 1);

    nodeUpdate.select('rect.node-rect')
        .attr('stroke', d => d.data.id === selectedNodeId ? '#a5b4fc' : 'rgba(255, 255, 255, 0.2)')
        .attr('stroke-width', d => d.data.id === selectedNodeId ? 3 : 1.5);

    nodeUpdate.select('.toggle-button-circle')
        .attr('fill', d => d.children ? '#334155' : '#4f46e5'); // slate-700 / indigo-600
    
    nodeUpdate.select('.toggle-button-text')
        .attr('text-anchor', 'middle').attr('dominant-baseline', 'middle')
        .attr('fill', d => d.children ? '#94a3b8' : 'white')
        .text(d => d.children ? '−' : '+');

    const nodeExit = node.exit().transition().duration(DURATION).ease(EASE)
        .attr('transform', `translate(${source.x}, ${source.y})`)
        .style('opacity', 0)
        .remove();

    nodes.forEach(d => {
        d.x0 = d.x;
        d.y0 = d.y;
    });
}

// --- INITIALIZATION ---
render(root);
