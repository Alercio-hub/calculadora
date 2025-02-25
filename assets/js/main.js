// main.js - Código compartilhado por todas as páginas

/********************
 * NAVEGAÇÃO GLOBAL *
 ********************/
const navigation = {
    // Alternar entre seções
    showSection: (sectionId) => {
      document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active-section');
      });
      document.getElementById(sectionId)?.classList.add('active-section');
    },
  
    // Inicializar eventos de navegação
    init: () => {
      // Eventos para links da navbar
      document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const sectionId = link.getAttribute('href').replace('#', '');
          navigation.showSection(sectionId);
        });
      });
  
      // Botão de menu mobile (se necessário)
      const menuToggle = document.querySelector('.menu-toggle');
      if(menuToggle) {
        menuToggle.addEventListener('click', () => {
          document.querySelector('.nav-links').classList.toggle('active');
        });
      }
    }
  };
  
  /***********************
   * GERENCIAMENTO DE DOM *
   ***********************/
  const domUtils = {
    // Formatar números como moeda
    formatCurrency: (value) => {
      return new Intl.NumberFormat('pt-MZ', {
        style: 'currency',
        currency: 'MT'
      }).format(value);
    },
  
    // Carregar template
    loadTemplate: async (templatePath) => {
      const response = await fetch(templatePath);
      return await response.text();
    }
  };
  
  /*************************
   * CALCULADORA PRINCIPAL *
   *************************/
  const calculator = {
    init: () => {
      const form = document.getElementById('feriasForm');
      if(!form) return; // Só executa na página da calculadora
  
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        calculator.calcularFerias();
      });
    },
  
    calcularFerias: () => {
      const salario = parseFloat(document.getElementById('salarioMensal').value.replace(',', '.'));
      const dias = parseInt(document.getElementById('diasFerias').value);
  
      if(isNaN(salario) || isNaN(dias)) {
        alert('Valores inválidos! Use números.');
        return;
      }
  
      const resultado = (salario / 30 * dias).toFixed(2);
      document.getElementById('resultado').innerHTML = `
        <h3>Valor Total:</h3>
        <p>${domUtils.formatCurrency(resultado)}</p>
      `;
    }
  };
  
  /*********************
   * INICIALIZAÇÃO GERAL
   *********************/
  document.addEventListener('DOMContentLoaded', () => {
    // Iniciar sistemas
    navigation.init();
    calculator.init();
    
    // Verificar se há hash na URL
    if(window.location.hash) {
      navigation.showSection(window.location.hash.replace('#', ''));
    }
  });