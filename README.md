# 🏥 BEDFLOW 3D

**Sistema de gerenciamento e visualização de leitos hospitalares em 3D.**

O BEDFLOW 3D é uma aplicação web que propõe uma maneira mais visual e intuitiva de acompanhar a ocupação hospitalar. Por meio de um ambiente tridimensional interativo, o sistema permite visualizar a estrutura do hospital, seus quartos e leitos, facilitando a identificação de situações que exigem atenção da equipe.

## ✨ Funcionalidades

- 🏨 **Visualização 3D do hospital:** representação interativa da estrutura hospitalar.
- 🛏️ **Gerenciamento visual de leitos:** visualização dos leitos distribuídos pelos quartos.
- 🎯 **Seleção interativa:** seleção de leitos e quartos diretamente na cena 3D.
- 📊 **Identificação de status:** representação visual dos estados dos leitos, incluindo higienização.
- 👩‍⚕️ **Simulação de profissionais:** representação de profissionais circulando pelo ambiente hospitalar.
- 🏢 **Ambiente externo:** representação da área externa, com estacionamento, veículos, vegetação e construções.
- 🖱️ **Navegação tridimensional:** possibilidade de explorar o ambiente por meio de controles de câmera.

## 🛠️ Tecnologias utilizadas

| Tecnologia | Aplicação |
|---|---|
| React | Construção da interface |
| TypeScript | Tipagem estática e segurança no desenvolvimento |
| Vite | Ambiente de desenvolvimento e build |
| Three.js | Renderização gráfica 3D |
| React Three Fiber | Integração do Three.js com React |
| React Three Drei | Recursos auxiliares para cenas 3D |

## 📁 Estrutura do projeto

```text
src/
├── components/
│   └── hospital/
│       ├── HospitalScene.tsx
│       ├── HospitalFloor.tsx
│       ├── HospitalRoom.tsx
│       ├── HospitalBed.tsx
│       ├── HospitalStaff.tsx
│       └── HospitalExterior.tsx
├── data/
│   └── data.json
└── types/
    └── bed.ts
```

*Observação: a estrutura acima representa os arquivos principais conhecidos do módulo 3D; outras pastas e componentes da aplicação podem existir.*

## 🚀 Como executar o projeto

### Pré-requisitos

- Node.js instalado.
- npm instalado.

### 1. Clone o repositório

```bash
git clone URL_DO_REPOSITORIO
```

### 2. Entre na pasta do projeto

```bash
cd NOME_DA_PASTA
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Execute em modo de desenvolvimento

```bash
npm run dev
```

Acesse o endereço local exibido pelo Vite no terminal, geralmente `http://localhost:5173`.

## 🧩 Organização e arquitetura

O projeto utiliza componentes React independentes para representar os elementos do ambiente hospitalar.

- **HospitalScene:** coordena a cena 3D, a iluminação, a câmera e os elementos do hospital.
- **HospitalRoom:** representa os quartos e suas estruturas.
- **HospitalBed:** representa os leitos e suas interações.
- **HospitalStaff:** representa os profissionais no ambiente.
- **HospitalExterior:** constrói os elementos externos do hospital.
- **HospitalFloor:** representa a base do ambiente.
- **data.json:** armazena os dados utilizados na representação do cenário.
- **bed.ts:** define os tipos utilizados para quartos e leitos.

Essa separação facilita a manutenção, a reutilização de componentes e a evolução das funcionalidades.

## 🎯 Objetivo

O BEDFLOW 3D busca tornar a visualização da ocupação hospitalar mais intuitiva por meio de uma representação tridimensional interativa, combinando desenvolvimento web moderno, visualização espacial e organização de informações.

## 🔮 Possíveis evoluções

- Filtros por setor, quarto e status do leito.
- Indicadores de ocupação e disponibilidade.
- Histórico de movimentações dos leitos.
- Melhorias de acessibilidade e responsividade.
- Animações e interações adicionais para otimizar a experiência dos usuários.

---

**BEDFLOW 3D** — Uma visão mais intuitiva da gestão hospitalar.
