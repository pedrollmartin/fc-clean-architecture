# Product Use Cases - Clean Architecture

Este projeto implementa 4 casos de uso (Use Cases) para a entidade Product seguindo os princípios de Clean Architecture.

## Use Cases Implementados

### 1. Create Product
Criar um novo produto com validações de negócio.

**Arquivo:** `src/usecase/product/create/`

**Testes:**
- ✅ Deve criar um produto do tipo A
- ✅ Deve criar um produto do tipo B
- ✅ Deve lançar erro quando tipo não é suportado
- ✅ Deve lançar erro quando nome é vazio
- ✅ Deve lançar erro quando preço é negativo

### 2. Find Product
Buscar um produto específico por ID.

**Arquivo:** `src/usecase/product/find/`

**Testes:**
- ✅ Deve encontrar um produto existente
- ✅ Deve lançar erro quando produto não existe

### 3. List Product
Listar todos os produtos cadastrados.

**Arquivo:** `src/usecase/product/list/`

**Testes:**
- ✅ Deve listar todos os produtos
- ✅ Deve retornar lista vazia quando não há produtos

### 4. Update Product
Atualizar dados de um produto existente.

**Arquivo:** `src/usecase/product/update/`

**Testes:**
- ✅ Deve atualizar um produto existente
- ✅ Deve lançar erro quando produto não existe
- ✅ Deve lançar erro quando nome é vazio
- ✅ Deve lançar erro quando preço é negativo


## Estratégia de Testes
### Testes de Unidade (*.unit.spec.ts)
- Testam a lógica isolada do use case
- Utilizam **mocks** do repositório
- Focam em validações de negócio
- Rápidos e independentes

**Executar testes de unidade:**
```bash
npm test -- --testNamePattern="Unit test"
```

### Testes de Integração (*.integration.spec.ts)
- Testam o fluxo completo com banco de dados real
- Utilizam banco de dados em memória (SQLite)
- Validam persistência e recuperação de dados
- Mais lentos, mas validam o comportamento real

**Executar testes de integração:**
```bash
npm test -- --testNamePattern="Test.*use case"
```

## Como Rodar os Testes

### Todos os testes
```bash
npm test
```

### Testes de unidade apenas
```bash
npm test -- --testNamePattern="Unit"
```

### Testes de integração apenas
```bash
npm test -- --testNamePattern="integration"
```

## Dependências

- **TypeScript**: Tipagem estática
- **Jest**: Framework de testes
- **Sequelize**: ORM para banco de dados
- **SQLite**: Banco de dados em memória para testes